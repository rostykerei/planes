package nl.rostykerei.planes.server.repository.impl;

import nl.rostykerei.planes.server.repository.StatisticsRepository;
import nl.rostykerei.planes.server.request.Filter;
import nl.rostykerei.planes.server.response.NameValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.List;

@Repository
public class StatisticsRepositoryImpl implements StatisticsRepository {

    private EntityManager em;

    @Autowired
    public StatisticsRepositoryImpl(EntityManager em) {
        this.em = em;
    }


    @Override
    @SuppressWarnings("unchecked")
    public List<NameValue> getTopAircrafts(Filter filter, int size) {
        String query = "SELECT NEW nl.rostykerei.planes.server.response.NameValue(a.type.type, COUNT(a)) " +
                "FROM Flight f JOIN Aircraft a ON f.aircraft = a.code " +
                "WHERE a.type IS NOT NULL " +
                "GROUP BY a.type ORDER BY count(a) DESC";

        return em.createQuery(query)
                .setMaxResults(size)
                .getResultList();

    }

    @Override
    @SuppressWarnings("unchecked")
    public List<NameValue> getTopAirlines(Filter filter, int size) {
        String query = "SELECT NEW nl.rostykerei.planes.server.response.NameValue(al.code, COUNT(al)) " +
                "FROM Flight f " +
                "JOIN Aircraft a ON f.aircraft = a.code " +
                "JOIN Airline al ON a.airline = al.code " +
                "WHERE a.airline IS NOT NULL ";

        if (!filter.getAirlines().isEmpty()) {
            query += "AND al.code IN :airlines ";
        }

        query += "GROUP BY al.code ORDER BY count(al) DESC";

        Query q = em.createQuery(query);

        if (!filter.getAirlines().isEmpty()) {
            q.setParameter("airlines", filter.getAirlines());
        }

        return q.setMaxResults(size)
                .getResultList();
    }
}
