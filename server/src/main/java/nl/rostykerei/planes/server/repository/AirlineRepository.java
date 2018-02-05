package nl.rostykerei.planes.server.repository;

import nl.rostykerei.planes.server.model.Airline;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AirlineRepository extends CrudRepository<Airline, String> {

    Optional<Airline> findFirstByCodeAndIataCode(String code, String iataCode);

    @Query("SELECT a " +
            "FROM Airline a " +
            "LEFT JOIN FETCH a.country " +
            "WHERE LOWER(a.code) LIKE LOWER(CONCAT(:query, '%')) " +
            "OR LOWER(a.iataCode) LIKE LOWER(CONCAT(:query, '%')) " +
            "OR LOWER(a.name) LIKE LOWER(CONCAT(:query, '%')) " +
            "OR LOWER(a.callsign) LIKE LOWER(CONCAT(:query, '%')) " +
            "ORDER BY a.code")
    List<Airline> autoCompletePage(Pageable pageable, @Param("query") String query);

}
