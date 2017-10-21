package nl.rostykerei.planes.server.repository;

import nl.rostykerei.planes.server.model.Aircraft;
import nl.rostykerei.planes.server.model.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.Date;

@Repository
public class AircraftRepository extends SimpleJpaRepository<Aircraft, String> implements CrudRepository<Aircraft, String> {

    @Autowired
    public AircraftRepository(EntityManager em) {
        super(Aircraft.class, em);
    }

    @Transactional
    public Aircraft findOrCreate(String code) {
        return findById(code).orElseGet(() -> {
            Aircraft aircraft = new Aircraft();

            aircraft.setCode(code);
            aircraft.setStatus(Status.NEW);
            aircraft.setLastUpdated(new Date());

            return save(aircraft);
        });
    }

}
