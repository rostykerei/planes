package nl.rostykerei.planes.server.controller;

import nl.rostykerei.planes.server.service.FlightLogService;
import nl.rostykerei.planes.server.service.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/map")
public class MapController {

    @Autowired
    private FlightService flightService;

    @Autowired
    private FlightLogService flightLogService;

    @RequestMapping("/active")
    public Map<String, Position> activeFlights() {
        Map<String, Position> result = new HashMap<>();

        flightService.findActiveFlights().forEach(f -> {
            flightLogService.findLastFlightLog(f).ifPresent(l -> result.put(f.getAircraft().getCode(), new Position(l.getLatitude(), l.getLongitude(), l.getHeading())));
        });

        return result;
    }

    public static class Position {
        private Float lat;
        private Float lon;
        private Integer heading;

        public Position(Float lat, Float lon, Integer heading) {
            this.lat = lat;
            this.lon = lon;
            this.heading = heading;
        }

        public Float getLat() {
            return lat;
        }

        public Float getLon() {
            return lon;
        }

        public Integer getHeading() {
            return heading;
        }
    }

}
