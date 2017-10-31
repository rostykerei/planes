package nl.rostykerei.planes.server.service;

import nl.rostykerei.planes.server.model.AircraftType;
import nl.rostykerei.planes.server.model.Status;
import nl.rostykerei.planes.server.repository.AircraftTypeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Service
public class AircraftTypeService {

    private AircraftTypeRepository repository;

    public AircraftTypeService(AircraftTypeRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public AircraftType findByType(String type) {
        return repository.findById(type).orElse(null);
    }

    @Transactional
    public AircraftType findOrCreate(String type) {
        return repository.findById(type).orElseGet(() -> {
            AircraftType newType = new AircraftType();

            newType.setType(type);
            newType.setStatus(Status.N);
            newType.setLastUpdated(new Date());

            return repository.save(newType);
        });
    }
}
