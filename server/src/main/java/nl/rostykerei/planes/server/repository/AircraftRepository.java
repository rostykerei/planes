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
public interface AircraftRepository extends CrudRepository<Aircraft, String> {

}
