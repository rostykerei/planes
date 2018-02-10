package nl.rostykerei.planes.server.repository;

import nl.rostykerei.planes.server.model.Aircraft;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AircraftRepository extends CrudRepository<Aircraft, String> {

    @Query("SELECT a " +
            "FROM Aircraft a " +
            "JOIN FETCH a.type " +
            "JOIN FETCH a.airline AS al " +
            "JOIN FETCH al.country " +
            "WHERE LOWER(a.code) LIKE LOWER(CONCAT(:query, '%')) " +
            "OR LOWER(a.registration) LIKE LOWER(CONCAT(:query, '%')) " +
            "OR LOWER(a.registrationCompact) LIKE LOWER(CONCAT(:query, '%')) " +
            "ORDER BY a.registration")
    List<Aircraft> autoComplete(Pageable pageable, @Param("query") String query);

}
