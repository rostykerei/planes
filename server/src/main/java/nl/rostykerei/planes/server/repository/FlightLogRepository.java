package nl.rostykerei.planes.server.repository;

import nl.rostykerei.planes.server.model.Flight;
import nl.rostykerei.planes.server.model.FlightLog;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FlightLogRepository extends CrudRepository<FlightLog, Integer> {

    @Query("SELECT l FROM FlightLog l WHERE l.flight = :flight ORDER BY l.id DESC")
    List<FlightLog> findLastFlightLogs(@Param("flight") Flight flight, Pageable pageable);

    @Query("SELECT l FROM FlightLog l WHERE l.flight.id = :flightId ORDER BY l.id ASC")
    List<FlightLog> findByFlightId(@Param("flightId") Integer flightId);

}
