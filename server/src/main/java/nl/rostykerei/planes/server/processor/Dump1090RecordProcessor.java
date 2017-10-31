package nl.rostykerei.planes.server.processor;

import nl.rostykerei.planes.server.model.Flight;
import nl.rostykerei.planes.server.model.FlightLog;
import nl.rostykerei.planes.server.model.Route;
import nl.rostykerei.planes.server.service.FlightLogService;
import nl.rostykerei.planes.server.service.FlightService;
import nl.rostykerei.planes.server.service.RouteService;
import nl.rostykerei.planes.server.service.dump1090.Dump1090Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class Dump1090RecordProcessor {

    private FlightService flightService;

    private RouteService routeService;

    private FlightLogService flightLogService;

    @Autowired
    public Dump1090RecordProcessor(FlightService flightService, RouteService routeService, FlightLogService flightLogService) {
        this.flightService = flightService;
        this.routeService = routeService;
        this.flightLogService = flightLogService;
    }

    @Transactional
    public void processRecord(Dump1090Response.Aircraft record) {

        // Fetching route
        Route route = null;
        if (record.getFlight() != null) {
            route = routeService.findOrCreate(record.getFlight());
        }

        // Find or create flight
        Flight flight = flightService.checkInFlight(record.getFlight(), route);

        FlightLog flightLog = new FlightLog();

        flightLog.setFlight(flight);
        flightLog.setAltitude(record.getAltitude());
        flightLog.setSpeed(record.getSpeed());
        flightLog.setHeading(record.getTrack());
        flightLog.setVerticalRate(record.getVertRate());
        flightLog.setLatitude(record.getLat());
        flightLog.setLongitude(record.getLon());

        flightLogService.create(flightLog);
    }

}
