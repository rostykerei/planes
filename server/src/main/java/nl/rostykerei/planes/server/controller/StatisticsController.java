package nl.rostykerei.planes.server.controller;

import nl.rostykerei.planes.server.repository.StatisticsRepository;
import nl.rostykerei.planes.server.repository.vo.NameValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/stats")
public class StatisticsController {

    @Autowired
    private StatisticsRepository repository;

    @RequestMapping("/aircrafts")
    public List<NameValue> getTopAircrafts() {
        return repository.getTopAirlines(PageRequest.of(0, 10)).getContent();
    }
}
