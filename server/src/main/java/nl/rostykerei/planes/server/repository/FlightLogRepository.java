package nl.rostykerei.planes.server.repository;

import nl.rostykerei.planes.server.model.FlightLog;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FlightLogRepository extends CrudRepository<FlightLog, Integer> {
}
