package nl.rostykerei.planes.server.agent;

import nl.rostykerei.planes.server.model.Aircraft;
import nl.rostykerei.planes.server.model.Route;
import nl.rostykerei.planes.server.model.Status;
import nl.rostykerei.planes.server.service.*;
import nl.rostykerei.planes.server.service.fr24.FR24Config;
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

    private AirlineService airlineService;

    private FR24Config fr24Config;

    @Autowired
    public FR24Agent(FR24Service fr24Service,
                     FR24Config fr24Config,
                     AircraftService aircraftService,
                     AircraftTypeService aircraftTypeService,
                     AirportService airportService,
                     RouteService routeService,
                     AirlineService airlineService) {

        this.fr24Service = fr24Service;
        this.fr24Config = fr24Config;
        this.aircraftService = aircraftService;
        this.aircraftTypeService = aircraftTypeService;
        this.airportService = airportService;
        this.routeService = routeService;
        this.airlineService = airlineService;
    }

    @Scheduled(fixedRateString = "${fr24.update-rate}")
    public void invoke() {
        if (fr24Config.isEnabled()) {
            FR24Response response = fr24Service.getData();

            if (response != null) {
                response.getFlights().forEach(this::processRecord);
            }
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
        String hex = record.getHex();

        if (hex == null) {
            return;
        }

        Aircraft aircraft = aircraftService.findByCode(hex);

        if (aircraft == null) {
            aircraft = new Aircraft();
            aircraft.setCode(hex);

            aircraft.setStatus(Status.N);
        }

        if (aircraft.getStatus() == Status.N) {
            String reg = record.getReg();

            if (reg != null) {
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

        if (callsign != null && from != null && to != null) {

            Route route = routeService.findByCallsign(callsign);

            if (route == null) {
                route = new Route();
                route.setCallsign(callsign);

                route.setStatus(Status.N);
            }

            if (route.getStatus() == Status.N) {
                if (route.getAirportFrom() == null) {
                    route.setAirportFrom(airportService.findByIataCode(from));
                }

                if (route.getAirportTo() == null) {
                    route.setAirportTo(airportService.findByIataCode(to));
                }

                if (record.getFlight() != null) {
                    if (route.getNumber() == null) {
                        route.setNumber(record.getFlight());
                    }

                    if (route.getAirline() == null) {
                        route.setAirline(
                            airlineService.findByTwoCodes(
                                callsign.substring(0, 3),
                                record.getFlight().substring(0, 2)
                            )
                        );
                    }
                }


                route.setStatus(Status.R);
                route.setLastUpdated(new Date());

                routeService.save(route);
            }
        }
    }
}
