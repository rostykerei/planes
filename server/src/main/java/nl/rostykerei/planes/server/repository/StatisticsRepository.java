package nl.rostykerei.planes.server.repository;

import nl.rostykerei.planes.server.model.Aircraft;
import nl.rostykerei.planes.server.repository.vo.NameValue;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface StatisticsRepository extends JpaRepository<Aircraft, Integer> {

    @Query("SELECT NEW nl.rostykerei.planes.server.repository.vo.NameValue(a.type.type, count(a)) " +
            "FROM Flight f JOIN Aircraft a ON f.aircraft = a.code " +
            "WHERE a.type IS NOT NULL " +
            "GROUP BY a.type ORDER BY count(a) DESC")
    Page<NameValue> getTopAirlines(Pageable pageable);
}
