package nl.rostykerei.planes.server.controller;

import nl.rostykerei.planes.server.response.FlightMapRow;
import nl.rostykerei.planes.server.response.LngLat;
import nl.rostykerei.planes.server.service.FlightLogService;
import nl.rostykerei.planes.server.service.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/map")
public class MapController {

    @Autowired
    private FlightService flightService;


    @Autowired
    private FlightLogService flightLogService;

    @RequestMapping("/active")
    public Map<Integer, FlightMapRow> activeFlights() {
        Map<Integer, FlightMapRow> result = new HashMap<>();

        // TODO improve to a single query
        flightService.findActiveFlights().forEach(f -> flightLogService
                .findLastFlightLog(f)
                .ifPresent(l -> result.put(f.getId(), new FlightMapRow(l)))
        );

        return result;
    }

    @RequestMapping("/path/{id}")
    public List<LngLat> path(@PathVariable("id") Integer flightId) {
        List<LngLat> result = new ArrayList<>();

        flightLogService.findFlightLogsByFlightId(flightId).forEach(f -> {
            if (f.getLatitude() != null && f.getLongitude() != null) {
                result.add(new LngLat(f.getLatitude(), f.getLongitude()));
            }
        });

        return result;
    }

}
