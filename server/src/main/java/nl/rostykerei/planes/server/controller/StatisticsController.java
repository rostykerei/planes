package nl.rostykerei.planes.server.controller;

import nl.rostykerei.planes.server.repository.StatisticsRepository;
import nl.rostykerei.planes.server.request.Filter;
import nl.rostykerei.planes.server.response.NameValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/stats")
public class StatisticsController {

    private final static int SIZE = 10;

    @Autowired
    private StatisticsRepository repository;

    @RequestMapping("/aircrafts")
    public List<NameValue> getTopAircrafts(Filter filter) {
        return repository.getTopAircrafts(filter, SIZE);
    }

    @RequestMapping("/airlines")
    public List<NameValue> getTopAirlines(Filter filter) {
        return repository.getTopAirlines(filter,SIZE);
    }
}
