package nl.rostykerei.planes.server.repository;

import nl.rostykerei.planes.server.model.Airport;
import nl.rostykerei.planes.server.response.OptionWithFlag;
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

    @Query("SELECT NEW nl.rostykerei.planes.server.response.OptionWithFlag(a.code, a.name, c.code) " +
            "FROM Airport a " +
            "JOIN Country c ON c.code = a.country " +
            "WHERE LOWER(a.code) LIKE LOWER(CONCAT('%', :query,'%')) " +
            "OR LOWER(a.name) LIKE LOWER(CONCAT('%', :query,'%')) " +
            "ORDER BY a.code")
    Page<OptionWithFlag> autoCompletePage(Pageable pageable, @Param("query") String query);

}
