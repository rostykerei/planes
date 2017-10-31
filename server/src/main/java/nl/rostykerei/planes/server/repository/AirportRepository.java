package nl.rostykerei.planes.server.repository;

import nl.rostykerei.planes.server.model.Airport;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.Optional;

@Repository
public interface AirportRepository extends CrudRepository<Airport, String> {

    Optional<Airport> findByIataCode(String iataCode);

}
