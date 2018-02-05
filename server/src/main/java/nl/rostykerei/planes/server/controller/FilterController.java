package nl.rostykerei.planes.server.controller;

import nl.rostykerei.planes.server.model.Airline;
import nl.rostykerei.planes.server.model.Airport;
import nl.rostykerei.planes.server.repository.AirlineRepository;
import nl.rostykerei.planes.server.repository.AirportRepository;
import nl.rostykerei.planes.server.repository.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/filter")
public class FilterController {

    private final static Pageable PAGE_REQUEST = PageRequest.of(0, 10);

    @Autowired
    private AirportRepository airportRepository;

    @Autowired
    private AirlineRepository airlineRepository;

    @Autowired
    private FlightRepository flightRepository;

    @RequestMapping("/airports/{query}")
    public List<Airport> autoCompleteAirports(@PathVariable("query") String query) {
        return airportRepository.autoCompletePage(PAGE_REQUEST, query);
    }

    @RequestMapping("/airlines/{query}")
    public List<Airline> autoCompleteAirlines(@PathVariable("query") String query) {
        return airlineRepository.autoCompletePage(PAGE_REQUEST, query);
    }
}
