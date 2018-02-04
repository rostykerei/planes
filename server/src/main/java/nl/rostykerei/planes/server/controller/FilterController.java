package nl.rostykerei.planes.server.controller;

import nl.rostykerei.planes.server.repository.AirlineRepository;
import nl.rostykerei.planes.server.repository.AirportRepository;
import nl.rostykerei.planes.server.response.Option;
import nl.rostykerei.planes.server.response.OptionWithFlag;
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

    @RequestMapping("/airports/{query}")
    public List<OptionWithFlag> autoCompleteAirports(@PathVariable("query") String query) {
        return airportRepository.autoCompletePage(PAGE_REQUEST, query).getContent();
    }

    @RequestMapping("/airlines/{query}")
    public List<Option> autoCompleteAirlines(@PathVariable("query") String query) {
        return airlineRepository.autoCompletePage(PAGE_REQUEST, query).getContent();
    }
}
