package nl.rostykerei.planes.server.service;

import nl.rostykerei.planes.server.model.Aircraft;
import nl.rostykerei.planes.server.model.Status;
import nl.rostykerei.planes.server.repository.AircraftRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Service
public class AircraftService {

    private AircraftRepository repository;

    @Autowired
    public AircraftService(AircraftRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public Aircraft findByCode(String code) {
        return repository.findById(code).orElse(null);
    }

    @Transactional
    public Aircraft findOrCreate(String code) {
        return repository.findById(code).orElseGet(() -> {
            Aircraft newAircraft = new Aircraft();

            newAircraft.setCode(code);
            newAircraft.setStatus(Status.N);
            newAircraft.setLastUpdated(new Date());

            return repository.save(newAircraft);
        });
    }

    @Transactional
    public long countAll() {
        return repository.count();
    }

    public Aircraft save(Aircraft aircraft) {
        return repository.save(aircraft);
    }
}
