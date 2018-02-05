package nl.rostykerei.planes.server.repository;

import nl.rostykerei.planes.server.model.Route;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RouteRepository extends CrudRepository<Route, String> {

    @Query("SELECT r " +
            "FROM Route r " +
            "LEFT JOIN FETCH r.airline AS airline " +
            "LEFT JOIN FETCH airline.country " +
            "LEFT JOIN FETCH r.airportFrom AS aFrom " +
            "LEFT JOIN FETCH aFrom.country " +
            "LEFT JOIN FETCH r.airportTo AS aTo " +
            "LEFT JOIN FETCH aTo.country " +
            "WHERE LOWER(r.callsign) LIKE LOWER(CONCAT(:query, '%')) " +
            "OR LOWER(r.number) LIKE LOWER(CONCAT(:query, '%')) " +
            "ORDER BY r.callsign")
    List<Route> autoComplete(Pageable pageable, @Param("query") String query);
}
