package nl.rostykerei.planes.server.agent;

import nl.rostykerei.planes.server.model.Flight;
import nl.rostykerei.planes.server.model.FlightLog;
import nl.rostykerei.planes.server.model.Route;
import nl.rostykerei.planes.server.response.FlightMapRow;
import nl.rostykerei.planes.server.service.FlightLogService;
import nl.rostykerei.planes.server.service.FlightService;
import nl.rostykerei.planes.server.service.RouteService;
import nl.rostykerei.planes.server.service.dump1090.Dump1090Config;
import nl.rostykerei.planes.server.service.dump1090.Dump1090Response;
import nl.rostykerei.planes.server.service.dump1090.Dump1090Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class Dump1090Agent {

    private FlightService flightService;

    private RouteService routeService;

    private FlightLogService flightLogService;

    private Dump1090Service dump1090Service;

    private Dump1090Config dump1090Config;

    @Autowired
    private SimpMessagingTemplate wsBroker;

    private static final Logger logger = LoggerFactory.getLogger(Dump1090Agent.class);

    @Autowired
    public Dump1090Agent(FlightService flightService, RouteService routeService,
                         FlightLogService flightLogService, Dump1090Service dump1090Service,
                         Dump1090Config dump1090Config) {
        this.flightService = flightService;
        this.routeService = routeService;
        this.flightLogService = flightLogService;
        this.dump1090Service = dump1090Service;
        this.dump1090Config = dump1090Config;
    }

    @Scheduled(fixedRateString = "${dump1090.update-rate}")
    public void invoke() {
        Dump1090Response response = dump1090Service.getData();
        long now = System.currentTimeMillis();

        if (response != null) {

            if (now - response.getNowMilliseconds() < dump1090Config.getUpdateRate()) {
                response.getAircraft().forEach(this::processRecord);
            }
            else {
                logger.warn("Too old data, skipping...");
            }
        }
    }

    @Transactional
    public void processRecord(Dump1090Response.Aircraft record) {
        if (record.getSeen() != null && record.getSeen() <= 5) {
            // Fetching route
            Route route = null;
            if (record.getFlight() != null) {
                route = routeService.findOrCreate(record.getFlight());
            }

            // Find or create flight
            Flight flight = flightService.checkInFlight(record.getHex(), route);

            FlightLog flightLog = new FlightLog();

            flightLog.setFlight(flight);
            flightLog.setAltitude(record.getAltitude());
            flightLog.setSpeed(record.getSpeed());
            flightLog.setHeading(record.getTrack());
            flightLog.setVerticalRate(record.getVertRate());
            flightLog.setLatitude(record.getLat());
            flightLog.setLongitude(record.getLon());
            flightLog.setSquawk(record.getSquawk());
            flightLog.setRssi(record.getRssi());

            flightLogService.create(flightLog);

            wsBroker.convertAndSend("/topic/flight", new FlightMapRow(flightLog));
        }
    }
}
