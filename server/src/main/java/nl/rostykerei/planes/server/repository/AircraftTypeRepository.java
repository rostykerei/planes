package nl.rostykerei.planes.server.repository;

import nl.rostykerei.planes.server.model.AircraftType;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AircraftTypeRepository extends CrudRepository<AircraftType, String> {

}
