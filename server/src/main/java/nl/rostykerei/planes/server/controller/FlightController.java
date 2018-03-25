package nl.rostykerei.planes.server.controller;

import nl.rostykerei.planes.server.model.Flight;
import nl.rostykerei.planes.server.model.FlightLog;
import nl.rostykerei.planes.server.service.FlightLogService;
import nl.rostykerei.planes.server.service.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/flights")
public class FlightController {

    @Autowired
    private FlightService flightService;

    @Autowired
    private FlightLogService flightLogService;

    @RequestMapping("/{id}")
    public Flight details(@PathVariable("id") Integer flightId) {
        return flightService.findById(flightId);
    }

    @RequestMapping("/{id}/log")
    public List<FlightLog> log(@PathVariable("id") Integer flightId) {
        return flightLogService.findFlightLogsByFlightId(flightId);
    }
}
