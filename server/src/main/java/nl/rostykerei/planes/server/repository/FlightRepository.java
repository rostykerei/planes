package nl.rostykerei.planes.server.repository;

import nl.rostykerei.planes.server.model.Flight;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface FlightRepository extends CrudRepository<Flight, Integer> {

    @Query("select f from Flight f join f.aircraft a where a.code = :code and f.lastContact >= :lastContact")
    Optional<Flight> findByAircraftAndLastContact(@Param("code") String aircraftCode,
                                                  @Param("lastContact") Date lastContact);

    List<Flight> findFlightsByLastContactAfter(Date lastContact);
}
