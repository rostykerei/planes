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
import java.util.List;

@RestController
@RequestMapping("/map")
public class MapController {

    @Autowired
    private FlightService flightService;

    @Autowired
    private FlightLogService flightLogService;

    @CrossOrigin
    @RequestMapping("/active")
    public List<FlightMapRow> activeFlights() {
        List<FlightMapRow> result = new ArrayList<>();

        flightService.findActiveFlights().forEach(f -> {
            String type, classification, callsign, to, from;

            if (f.getAircraft() != null && f.getAircraft().getType() != null) {
                type = f.getAircraft().getType().getType();
                classification = f.getAircraft().getType().getClassification();
            } else {
                type = null;
                classification = null;
            }

            if (f.getRoute() != null) {
                callsign = f.getRoute().getCallsign();

                if (f.getRoute().getAirportTo() != null) {
                    to = f.getRoute().getAirportTo().getCode();
                }
                else {
                    to = null;
                }

                if (f.getRoute().getAirportFrom() != null) {
                    from = f.getRoute().getAirportFrom().getCode();
                }
                else {
                    from = null;
                }
            } else {
                callsign = null;
                to = null;
                from = null;
            }

            flightLogService
                .findLastFlightLog(f)
                .ifPresent(l -> result.add(
                    new FlightMapRow(f.getId(), l.getLatitude(), l.getLongitude(), l.getHeading(),
                            l.getSpeed(), l.getAltitude(), l.getVerticalRate(),
                            type, classification, callsign, from, to)
                ));
        });

        return result;
    }

    @CrossOrigin
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
