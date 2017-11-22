package nl.rostykerei.planes.server.controller;

import nl.rostykerei.planes.server.response.FlightMapRow;
import nl.rostykerei.planes.server.service.FlightLogService;
import nl.rostykerei.planes.server.service.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/map")
public class MapController {

    @Autowired
    private FlightService flightService;

    @Autowired
    private FlightLogService flightLogService;

    @RequestMapping("/active")
    public List<FlightMapRow> activeFlights() {
        List<FlightMapRow> result = new ArrayList<>();

        flightService.findActiveFlights().forEach(f -> {
            String type;

            if (f.getAircraft() != null && f.getAircraft().getType() != null) {
                type = f.getAircraft().getType().getClassification();
            } else {
                type = null;
            }

            flightLogService
                .findLastFlightLog(f)
                .ifPresent(l -> result.add(
                    new FlightMapRow(f.getId(), l.getLatitude(), l.getLongitude(), l.getHeading(), type)
                ));
        });

        return result;
    }

}
