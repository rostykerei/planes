package nl.rostykerei.planes.server.repository;

import nl.rostykerei.planes.server.model.Airline;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AirlineRepository extends CrudRepository<Airline, String> {

    Optional<Airline> findFirstByCodeAndIataCode(String code, String iataCode);

}
