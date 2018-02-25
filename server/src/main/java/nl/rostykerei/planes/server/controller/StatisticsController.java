package nl.rostykerei.planes.server.controller;

import nl.rostykerei.planes.server.repository.StatisticsRepository;
import nl.rostykerei.planes.server.request.Filter;
import nl.rostykerei.planes.server.response.NameValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/stats")
public class StatisticsController {

    private final static Pageable PAGE_REQUEST = PageRequest.of(0, 10);

    @Autowired
    private StatisticsRepository repository;

    @RequestMapping("/aircrafts")
    public List<NameValue> getTopAircrafts(Filter filter) {
        return repository.getTopAircrafts(PAGE_REQUEST).getContent();
    }

    @RequestMapping("/airlines")
    public List<NameValue> getTopAirlines(Filter filter) {
        return repository.getTopAirlines(PAGE_REQUEST).getContent();
    }
}
