package nl.rostykerei.planes.server.service;

import nl.rostykerei.planes.server.model.Route;
import nl.rostykerei.planes.server.model.Status;
import nl.rostykerei.planes.server.repository.RouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Service
public class RouteService {

    private RouteRepository repository;

    @Autowired
    public RouteService(RouteRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public Route findOrCreate(String callsign) {
        return repository.findById(callsign).orElseGet(() -> {
            Route route = new Route();

            route.setCallsign(callsign);

            route.setStatus(Status.NEW);
            route.setLastUpdated(new Date());

            return repository.save(route);
        });
    }

    @Transactional
    public long countAll() {
        return repository.count();
    }
}
