package nl.rostykerei.planes.server.controller;

import nl.rostykerei.planes.server.model.*;
import nl.rostykerei.planes.server.repository.*;
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

    private final static Pageable PAGE_REQUEST = PageRequest.of(0, 5);

    @Autowired
    private AircraftRepository aircraftRepository;

    @Autowired
    private AircraftTypeRepository aircraftTypeRepository;

    @Autowired
    private AirportRepository airportRepository;

    @Autowired
    private AirlineRepository airlineRepository;

    @Autowired
    private RouteRepository routeRepository;

    @RequestMapping("/aircrafts/{query}")
    public List<Aircraft> autoCompleteAircraft(@PathVariable("query") String query) {
        return aircraftRepository.autoComplete(PAGE_REQUEST, query);
    }

    @RequestMapping("/types/{query}")
    public List<AircraftType> autoCompleteAircraftType(@PathVariable("query") String query) {
        return aircraftTypeRepository.autoComplete(PAGE_REQUEST, query);
    }

    @RequestMapping("/airlines/{query}")
    public List<Airline> autoCompleteAirlines(@PathVariable("query") String query) {
        return airlineRepository.autoComplete(PAGE_REQUEST, query);
    }

    @RequestMapping("/airports/{query}")
    public List<Airport> autoCompleteAirports(@PathVariable("query") String query) {
        return airportRepository.autoComplete(PAGE_REQUEST, query);
    }

    @RequestMapping("/routes/{query}")
    public List<Route> autoCompleteRoutes(@PathVariable("query") String query) {
        return routeRepository.autoComplete(PAGE_REQUEST, query);
    }
}
