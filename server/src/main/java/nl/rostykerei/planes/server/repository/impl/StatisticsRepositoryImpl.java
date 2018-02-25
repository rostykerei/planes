package nl.rostykerei.planes.server.repository.impl;

import nl.rostykerei.planes.server.repository.StatisticsRepository;
import nl.rostykerei.planes.server.request.Filter;
import nl.rostykerei.planes.server.request.FilterField;
import nl.rostykerei.planes.server.response.NameValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class StatisticsRepositoryImpl implements StatisticsRepository {

    private EntityManager em;

    private final static Map<FilterField, String> FILTER_MAP = new HashMap<>();

    static {
        FILTER_MAP.put(FilterField.AIRCRAFTS, "aircraft.registration");
        FILTER_MAP.put(FilterField.TYPES, "aircraftType.type");
        FILTER_MAP.put(FilterField.AIRLINES, "airline.code");
        FILTER_MAP.put(FilterField.ROUTES, "route.callsign");
        FILTER_MAP.put(FilterField.ORIGINS, "origin.code");
        FILTER_MAP.put(FilterField.DESTINATIONS, "destination.code");
    }

    @Autowired
    public StatisticsRepositoryImpl(EntityManager em) {
        this.em = em;
    }

    @Override
    @SuppressWarnings("unchecked")
    public List<NameValue> getTopAircrafts(Filter filter, int size) {
        String query = "SELECT NEW nl.rostykerei.planes.server.response.NameValue(aircraft.type.type, COUNT(flight)) " +
                "FROM Flight flight " +
                "JOIN Aircraft aircraft ON flight.aircraft = aircraft.code " +
                "JOIN AircraftType aircraftType ON aircraft.type = aircraftType.type " +
                "LEFT JOIN Airline airline ON aircraft.airline = airline.code " +
                "LEFT JOIN Route route ON flight.route = route.callsign " +
                "LEFT JOIN Airport origin ON route.airportFrom = origin.code " +
                "LEFT JOIN Airport destination ON route.airportTo = destination.code " +
                "WHERE aircraft.type IS NOT NULL ";

        query += filterClause(filter);
        query += "GROUP BY aircraft.type ORDER BY count(flight) DESC";

        Query q = filterClause(em.createQuery(query), filter);

        return q.setMaxResults(size).getResultList();
    }

    @Override
    @SuppressWarnings("unchecked")
    public List<NameValue> getTopAirlines(Filter filter, int size) {
        String query = "SELECT NEW nl.rostykerei.planes.server.response.NameValue(airline.code, COUNT(flight)) " +
                "FROM Flight flight " +
                "JOIN Aircraft aircraft ON flight.aircraft = aircraft.code " +
                "LEFT JOIN AircraftType aircraftType ON aircraft.type = aircraftType.type " +
                "JOIN Airline airline ON aircraft.airline = airline.code " +
                "LEFT JOIN Route route ON flight.route = route.callsign " +
                "LEFT JOIN Airport origin ON route.airportFrom = origin.code " +
                "LEFT JOIN Airport destination ON route.airportTo = destination.code " +
                "WHERE aircraft.airline IS NOT NULL ";

        query += filterClause(filter);
        query += "GROUP BY airline.code ORDER BY count(flight) DESC";

        Query q = filterClause(em.createQuery(query), filter);

        return q.setMaxResults(size).getResultList();
    }

    @Override
    @SuppressWarnings("unchecked")
    public List<NameValue> getTopOrigins(Filter filter, int size) {
        String query = "SELECT NEW nl.rostykerei.planes.server.response.NameValue(origin.code, COUNT(flight)) " +
                "FROM Flight flight " +
                "LEFT JOIN Aircraft aircraft ON flight.aircraft = aircraft.code " +
                "LEFT JOIN AircraftType aircraftType ON aircraft.type = aircraftType.type " +
                "LEFT JOIN Airline airline ON aircraft.airline = airline.code " +
                "JOIN Route route ON flight.route = route.callsign " +
                "JOIN Airport origin ON route.airportFrom = origin.code " +
                "LEFT JOIN Airport destination ON route.airportTo = destination.code " +
                "WHERE route.airportFrom IS NOT NULL ";

        query += filterClause(filter);
        query += "GROUP BY origin.code ORDER BY count(flight) DESC";

        Query q = filterClause(em.createQuery(query), filter);

        return q.setMaxResults(size).getResultList();
    }

    @Override
    public List<NameValue> getTopDestinations(Filter filter, int size) {
        String query = "SELECT NEW nl.rostykerei.planes.server.response.NameValue(destination.code, COUNT(flight)) " +
                "FROM Flight flight " +
                "LEFT JOIN Aircraft aircraft ON flight.aircraft = aircraft.code " +
                "LEFT JOIN AircraftType aircraftType ON aircraft.type = aircraftType.type " +
                "LEFT JOIN Airline airline ON aircraft.airline = airline.code " +
                "JOIN Route route ON flight.route = route.callsign " +
                "LEFT JOIN Airport origin ON route.airportFrom = origin.code " +
                "JOIN Airport destination ON route.airportTo = destination.code " +
                "WHERE route.airportTo IS NOT NULL ";

        query += filterClause(filter);
        query += "GROUP BY destination.code ORDER BY count(flight) DESC";

        Query q = filterClause(em.createQuery(query), filter);

        return q.setMaxResults(size).getResultList();
    }

    private String filterClause(Filter filter) {
        StringBuilder q = new StringBuilder();

        if (filter.getDateFrom().isPresent()) {
            q.append("AND flight.firstContact > :dateFrom ");
        }

        if (filter.getDateTo().isPresent()) {
            q.append("AND flight.lastContact < :dateTo ");
        }

        for (FilterField field : filter.getSets()) {
            if (!filter.getSet(field).isEmpty()) {
                q.append("AND ")
                .append(FILTER_MAP.get(field))
                .append(" IN :")
                .append(field.getName())
                .append(" ");
            }
        }

        return q.toString();
    }

    private Query filterClause(Query query, Filter filter) {

        if (filter.getDateFrom().isPresent()) {
            query.setParameter("dateFrom", filter.getDateFrom().get());
        }

        if (filter.getDateTo().isPresent()) {
            query.setParameter("dateTo", filter.getDateTo().get());
        }

        for (FilterField field : filter.getSets()) {
            query.setParameter(field.getName(), filter.getSet(field));
        }

        return query;
    }
}
