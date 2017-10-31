package nl.rostykerei.planes.server.agent;

import nl.rostykerei.planes.server.model.Aircraft;
import nl.rostykerei.planes.server.model.Route;
import nl.rostykerei.planes.server.model.Status;
import nl.rostykerei.planes.server.service.AircraftService;
import nl.rostykerei.planes.server.service.AircraftTypeService;
import nl.rostykerei.planes.server.service.AirportService;
import nl.rostykerei.planes.server.service.RouteService;
import nl.rostykerei.planes.server.service.fr24.FR24Response;
import nl.rostykerei.planes.server.service.fr24.FR24Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Component
public class FR24Agent {

    private FR24Service fr24Service;

    private AircraftService aircraftService;

    private AircraftTypeService aircraftTypeService;

    private AirportService airportService;

    private RouteService routeService;

    @Autowired
    public FR24Agent(FR24Service fr24Service,
                     AircraftService aircraftService,
                     AircraftTypeService aircraftTypeService,
                     AirportService airportService,
                     RouteService routeService) {

        this.fr24Service = fr24Service;
        this.aircraftService = aircraftService;
        this.aircraftTypeService = aircraftTypeService;
        this.airportService = airportService;
        this.routeService = routeService;
    }

    @Scheduled(fixedRate = 60000)
    public void invoke() {
        FR24Response response = fr24Service.getData();

        if (response != null) {
            response.getFlights().forEach(this::processRecord);
        }
    }

    private void processRecord(FR24Response.Flight record) {
        processType(record);
        processAircraft(record);
        processRoute(record);
    }

    @Transactional
    void processType(FR24Response.Flight record) {
        String type = record.getType();

        if (type != null) {
            aircraftTypeService.findOrCreate(type);
        }
    }

    @Transactional
    void processAircraft(FR24Response.Flight record) {
        Aircraft aircraft = aircraftService.findByCode(record.getHex());

        if (aircraft == null) {
            aircraft = new Aircraft();
            aircraft.setCode(record.getHex());

            aircraft.setStatus(Status.N);
        }

        if (aircraft.getStatus() == Status.N) {
            String reg = record.getReg();

            if (reg != null) {
                reg = reg.toUpperCase();

                aircraft.setRegistration(reg);
                aircraft.setRegistrationCompact(
                        reg.replace("-", "").replace(" ", "")
                );
            }

            if (record.getType() != null) {
                aircraft.setType(aircraftTypeService.findByType(record.getType()));
            }

            aircraft.setStatus(Status.R);
            aircraft.setLastUpdated(new Date());

            aircraftService.save(aircraft);
        }
    }

    @Transactional
    void processRoute(FR24Response.Flight record) {
        String callsign = record.getCallsign();

        String from = record.getFrom();
        String to = record.getTo();

        if (callsign != null && !callsign.trim().isEmpty()
                && from != null && !from.trim().isEmpty()
                && to != null && !to.trim().isEmpty()) {

            callsign = callsign.trim().toUpperCase();

            from = from.trim().toUpperCase();
            to = to.trim().toUpperCase();

            Route route = routeService.findByCallsign(callsign);

            if (route == null) {
                route = new Route();
                route.setCallsign(callsign);

                route.setStatus(Status.N);
            }

            if (route.getStatus() == Status.N) {
                route.setNumber(record.getFlight().trim().toUpperCase());
                route.setAirportFrom(airportService.findByIataCode(from));
                route.setAirportTo(airportService.findByIataCode(to));

                route.setStatus(Status.R);
                route.setLastUpdated(new Date());

                routeService.save(route);
            }
        }
    }
}
