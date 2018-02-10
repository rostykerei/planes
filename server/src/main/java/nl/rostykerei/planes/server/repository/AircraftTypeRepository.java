package nl.rostykerei.planes.server.repository;

import nl.rostykerei.planes.server.model.AircraftType;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AircraftTypeRepository extends CrudRepository<AircraftType, String> {

    @Query("SELECT t " +
            "FROM AircraftType t " +
            "WHERE LOWER(t.type) LIKE LOWER(CONCAT(:query, '%')) " +
            "OR LOWER(t.manufacturer) LIKE LOWER(CONCAT(:query, '%')) " +
            "OR LOWER(t.model) LIKE LOWER(CONCAT(:query, '%')) " +
            "ORDER BY t.type")
    List<AircraftType> autoComplete(Pageable pageable, @Param("query") String query);
}
