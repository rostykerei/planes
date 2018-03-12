package nl.rostykerei.planes.server.repository.impl;

import nl.rostykerei.planes.server.model.*;
import nl.rostykerei.planes.server.repository.StatisticsRepository;
import nl.rostykerei.planes.server.request.Filter;
import nl.rostykerei.planes.server.request.FilterField;
import nl.rostykerei.planes.server.response.CodeNameValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.criteria.*;
import java.util.ArrayList;
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
    public List<CodeNameValue> getTopTypes(Filter filter, int size) {
        CriteriaBuilder builder = em.getCriteriaBuilder();
        CriteriaQuery<CodeNameValue> q = builder.createQuery(CodeNameValue.class);

        Root<Flight> c = q.from(Flight.class);
        c.join(Flight_.aircraft).join(Aircraft_.type);
        c.join(Flight_.aircraft).join(Aircraft_.airline, JoinType.LEFT);
        c.join(Flight_.route, JoinType.LEFT).join(Route_.airportFrom, JoinType.LEFT);
        c.join(Flight_.route, JoinType.LEFT).join(Route_.airportTo, JoinType.LEFT);

        Path<String> fieldType = c.get(Flight_.aircraft).get(Aircraft_.type).get(AircraftType_.type);
        Path<String> fieldManufacturer = c.get(Flight_.aircraft).get(Aircraft_.type).get(AircraftType_.manufacturer);
        Path<String> fieldModel = c.get(Flight_.aircraft).get(Aircraft_.type).get(AircraftType_.model);
        Expression<Long> count = builder.count(c.get(Flight_.id));

        CompoundSelection<CodeNameValue> selection = builder.construct(CodeNameValue.class,
                fieldType, builder.concat(builder.concat(fieldManufacturer, " "), fieldModel), count);

        Predicate predicate = getPredicate(filter, builder, c);

        return em.createQuery(q.select(selection).where(predicate).groupBy(fieldType).orderBy(builder.desc(count)))
                .setMaxResults(size)
                .getResultList();
    }

    private Predicate getPredicate(Filter filter, CriteriaBuilder builder, Root<Flight> c) {
        List<Predicate> predicates = new ArrayList<>();

        if (filter.contains(FilterField.AIRCRAFTS)) {
            predicates.add(c.get(Flight_.aircraft).get(Aircraft_.registration).in(filter.getSet(FilterField.AIRCRAFTS)));
        }

        if (filter.contains(FilterField.AIRLINES)) {
            predicates.add(c.get(Flight_.aircraft).get(Aircraft_.airline).get(Airline_.code).in(filter.getSet(FilterField.AIRLINES)));
        }

        if (filter.contains(FilterField.TYPES)) {
            predicates.add(c.get(Flight_.aircraft).get(Aircraft_.type).get(AircraftType_.type).in(filter.getSet(FilterField.TYPES)));
        }

        if (filter.contains(FilterField.ROUTES)) {
            predicates.add(c.get(Flight_.route).get(Route_.callsign).in(filter.getSet(FilterField.ROUTES)));
        }

        if (filter.contains(FilterField.ORIGINS)) {
            predicates.add(c.get(Flight_.route).get(Route_.airportFrom).get(Airport_.code).in(filter.getSet(FilterField.ORIGINS)));
        }

        if (filter.contains(FilterField.DESTINATIONS)) {
            predicates.add(c.get(Flight_.route).get(Route_.airportTo).get(Airport_.code).in(filter.getSet(FilterField.ORIGINS)));
        }

        Predicate predicate = builder.isTrue(builder.literal(true));

        if (!predicates.isEmpty()) {
            predicate = builder.and(predicates.toArray(new Predicate[0]));
        }

        return predicate;
    }

    @Override
    @SuppressWarnings("unchecked")
    public List<CodeNameValue> getTopAirlines(Filter filter, int size) {
        String query = "SELECT " +
                "NEW nl.rostykerei.planes.server.response.CodeNameValue(" +
                "   airline.code," +
                "   airline.name," +
                "   COUNT(flight)) ";

        String from = "FROM Flight flight " +
                "JOIN Aircraft aircraft ON flight.aircraft = aircraft.code " +
                "LEFT JOIN AircraftType aircraftType ON aircraft.type = aircraftType.type " +
                "JOIN Airline airline ON aircraft.airline = airline.code " +
                "LEFT JOIN Route route ON flight.route = route.callsign " +
                "LEFT JOIN Airport origin ON route.airportFrom = origin.code " +
                "LEFT JOIN Airport destination ON route.airportTo = destination.code " +
                "WHERE aircraft.airline IS NOT NULL ";

        query += from;
        query += filterClause(filter);
        query += "GROUP BY airline.code ORDER BY count(flight) DESC";

        List<CodeNameValue> results = filterClause(em.createQuery(query), filter)
                .setMaxResults(filter.contains(FilterField.AIRLINES) ? size : size - 1)
                .getResultList();

        if (!filter.contains(FilterField.AIRLINES)) {
            String totalQuery = "SELECT count (flight) " + from + filterClause(filter);

            long total = (long) filterClause(
                    em.createQuery(totalQuery),
                    filter)
                    .getSingleResult();

            for (CodeNameValue v : results) {
                total -= v.getValue();
            }

            if (total > 0) {
                results.add(new CodeNameValue("OTHERS", "Others", total));
            }
        }

        return results;
    }

    @Override
    @SuppressWarnings("unchecked")
    public List<CodeNameValue> getTopOrigins(Filter filter, int size) {
        String query = "SELECT " +
                "NEW nl.rostykerei.planes.server.response.CodeNameValue(" +
                "   origin.code," +
                "   origin.name," +
                "   COUNT(flight)) " +
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
    public List<CodeNameValue> getTopDestinations(Filter filter, int size) {
        String query = "SELECT " +
                "NEW nl.rostykerei.planes.server.response.CodeNameValue(" +
                "   destination.code," +
                "   destination.name," +
                "   COUNT(flight)) " +
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
            if (filter.contains(field)) {
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
