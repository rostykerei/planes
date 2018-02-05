package nl.rostykerei.planes.server.repository;

import nl.rostykerei.planes.server.model.Airport;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AirportRepository extends CrudRepository<Airport, String> {

    Optional<Airport> findByIataCode(String iataCode);

    @Query("SELECT a, c FROM Airport AS a  " +
            "LEFT JOIN Country c ON c.code = a.country " +
            "WHERE LOWER(a.code) LIKE LOWER(CONCAT('%', :query,'%')) " +
            "OR LOWER(a.iataCode) LIKE LOWER(CONCAT('%', :query,'%')) " +
            "OR LOWER(a.name) LIKE LOWER(CONCAT('%', :query,'%')) " +
            "ORDER BY a.code")
    Page<Airport> autoCompletePage(Pageable pageable, @Param("query") String query);

}
