package nl.rostykerei.planes.server.repository.impl;

import nl.rostykerei.planes.server.model.*;
import nl.rostykerei.planes.server.repository.StatisticsRepository;
import nl.rostykerei.planes.server.request.Filter;
import nl.rostykerei.planes.server.request.FilterField;
import nl.rostykerei.planes.server.response.CodeNameValue;
import nl.rostykerei.planes.server.response.DateValue;
import nl.rostykerei.planes.server.response.PairValue;
import nl.rostykerei.planes.server.response.Table;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.criteria.*;
import javax.persistence.metamodel.SingularAttribute;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Repository
public class StatisticsRepositoryImpl implements StatisticsRepository {

    private EntityManager em;

    @Autowired
    public StatisticsRepositoryImpl(EntityManager em) {
        this.em = em;
    }

    @Override
    public List<CodeNameValue> getTopTypes(Filter filter, int size) {
        CriteriaBuilder builder = em.getCriteriaBuilder();
        CriteriaQuery<CodeNameValue> q = builder.createQuery(CodeNameValue.class);

        Root<Flight> c = q.from(Flight.class);

        Join<Flight, Aircraft> joinAircraft = c.join(Flight_.aircraft);
        Join<Aircraft, AircraftType> joinType = joinAircraft.join(Aircraft_.type);
        joinAircraft.join(Aircraft_.airline, JoinType.LEFT);

        Join<Flight, Route> joinRoute = c.join(Flight_.route, JoinType.LEFT);
        joinRoute.join(Route_.airportFrom, JoinType.LEFT);
        joinRoute.join(Route_.airportTo, JoinType.LEFT);

        Path<String> fieldType = joinType.get(AircraftType_.type);
        Path<String> fieldManufacturer = joinType.get(AircraftType_.manufacturer);
        Path<String> fieldModel = joinType.get(AircraftType_.model);
        Expression<Long> count = builder.count(c.get(Flight_.id));

        CompoundSelection<CodeNameValue> selection = builder.construct(CodeNameValue.class,
                fieldType, builder.concat(builder.concat(fieldManufacturer, " "), fieldModel), count);

        Predicate predicate = buildPredicate(filter, builder, c);

        return em.createQuery(q.select(selection).where(predicate).groupBy(fieldType).orderBy(builder.desc(count)))
                .setMaxResults(size)
                .getResultList();
    }

    @Override
    public List<CodeNameValue> getTopAirlines(Filter filter, int size) {
        CriteriaBuilder builder = em.getCriteriaBuilder();
        CriteriaQuery<CodeNameValue> q = builder.createQuery(CodeNameValue.class);

        Root<Flight> c = q.from(Flight.class);

        Join<Flight, Aircraft> joinAircraft = c.join(Flight_.aircraft);
        Join<Aircraft, Airline> joinAirlines = joinAircraft.join(Aircraft_.airline);
        joinAircraft.join(Aircraft_.type, JoinType.LEFT);

        Join<Flight, Route> joinRoute = c.join(Flight_.route, JoinType.LEFT);
        joinRoute.join(Route_.airportFrom, JoinType.LEFT);
        joinRoute.join(Route_.airportTo, JoinType.LEFT);

        Path<String> fieldAirlineCode = joinAirlines.get(Airline_.code);
        Path<String> fieldAirlineName = joinAirlines.get(Airline_.name);
        Expression<Long> count = builder.count(c.get(Flight_.id));

        CompoundSelection<CodeNameValue> selection = builder.construct(CodeNameValue.class,
                fieldAirlineCode, fieldAirlineName, count);

        Predicate predicate = buildPredicate(filter, builder, c);

        return em.createQuery(q.select(selection).where(predicate).groupBy(fieldAirlineCode).orderBy(builder.desc(count)))
                .setMaxResults(size)
                .getResultList();
    }

    @Override
    public List<DateValue> getFlightsPerHour(Filter filter) {
        CriteriaBuilder builder = em.getCriteriaBuilder();
        CriteriaQuery<DateValue> q = builder.createQuery(DateValue.class);

        Root<Flight> c = q.from(Flight.class);

        Expression<Long> count = builder.count(c.get(Flight_.id));

        CompoundSelection<DateValue> selection = builder.construct(DateValue.class,
                builder.function("date", Date.class, c.get(Flight_.firstContact)),
                builder.function("hour", Integer.class, c.get(Flight_.firstContact)),
                count);

        Join<Flight, Aircraft> joinAircraft = c.join(Flight_.aircraft);
        joinAircraft.join(Aircraft_.type, JoinType.LEFT);
        joinAircraft.join(Aircraft_.airline, JoinType.LEFT);

        Join<Flight, Route> joinRoute = c.join(Flight_.route, JoinType.LEFT);
        joinRoute.join(Route_.airportFrom, JoinType.LEFT);
        joinRoute.join(Route_.airportTo, JoinType.LEFT);

        Predicate predicate = buildPredicate(filter, builder, c);

        return em.createQuery(
                q.select(selection)
                        .where(predicate)
                        .groupBy(
                                builder.function("date", Date.class, c.get(Flight_.firstContact)),
                                builder.function("hour", Integer.class, c.get(Flight_.firstContact))
                        )
                        .orderBy(
                                builder.desc(builder.function("date", Date.class, c.get(Flight_.firstContact))),
                                builder.desc(builder.function("hour", Integer.class, c.get(Flight_.firstContact)))
                        )
        )
                .setMaxResults(100)
                .getResultList();
    }

    @Override
    public List<CodeNameValue> getTopOrigins(Filter filter, int size) {
        return getTopAirport(filter, size, Route_.airportFrom, Route_.airportTo);
    }

    @Override
    public List<CodeNameValue> getTopDestinations(Filter filter, int size) {
        return getTopAirport(filter, size, Route_.airportTo, Route_.airportFrom);
    }

    @Override
    public List<PairValue> getTopRoutes(Filter filter, int size) {
        CriteriaBuilder builder = em.getCriteriaBuilder();
        CriteriaQuery<PairValue> q = builder.createQuery(PairValue.class);

        Root<Flight> c = q.from(Flight.class);

        Join<Flight, Route> joinRoute = c.join(Flight_.route);
        Join<Route, Airport> joinAirportFrom = joinRoute.join(Route_.airportFrom);
        Join<Route, Airport> joinAirportTo = joinRoute.join(Route_.airportTo);

        Join<Flight, Aircraft> joinAircraft = c.join(Flight_.aircraft, JoinType.LEFT);
        joinAircraft.join(Aircraft_.airline, JoinType.LEFT);
        joinAircraft.join(Aircraft_.type, JoinType.LEFT);

        Path<String> fromCode = joinAirportFrom.get(Airport_.code);
        Path<String> fromName = joinAirportFrom.get(Airport_.name);
        Path<String> toCode = joinAirportTo.get(Airport_.code);
        Path<String> toName = joinAirportTo.get(Airport_.name);
        Expression<Long> count = builder.count(c.get(Flight_.id));

        CompoundSelection<PairValue> selection = builder.construct(PairValue.class,
                fromCode, fromName, toCode, toName, count);

        Predicate predicate = buildPredicate(filter, builder, c);

        return em.createQuery(q.select(selection).where(predicate).groupBy(fromCode, toCode).orderBy(builder.desc(count)))
                .setMaxResults(size)
                .getResultList();
    }

    @Override
    public Table<Flight> getFlightsTable(Filter filter, SortColumn sortColumn, SortOrder sortOrder, int page, int size) {
        return new Table<>(getFlightsList(filter, sortColumn, sortOrder, page, size), getFlightsCount(filter));
    }

    private List<Flight> getFlightsList(Filter filter, SortColumn sortColumn, SortOrder sortOrder, int page, int size) {
        CriteriaBuilder builder = em.getCriteriaBuilder();
        CriteriaQuery<Flight> q = builder.createQuery(Flight.class);

        Root<Flight> c = q.from(Flight.class);

        Fetch<Flight, Aircraft> aircraftFetch = c.fetch(Flight_.aircraft, JoinType.LEFT);
        aircraftFetch.fetch(Aircraft_.type, JoinType.LEFT);
        aircraftFetch.fetch(Aircraft_.airline, JoinType.LEFT).fetch(Airline_.country, JoinType.LEFT);

        Fetch<Flight, Route> routeFetch = c.fetch(Flight_.route, JoinType.LEFT);
        routeFetch.fetch(Route_.airportFrom, JoinType.LEFT).fetch(Airport_.country, JoinType.LEFT);
        routeFetch.fetch(Route_.airportTo, JoinType.LEFT).fetch(Airport_.country, JoinType.LEFT);

        Predicate predicate = buildPredicate(filter, builder, c);

        Path sort = c.get(Flight_.id);

        Order orderBy = sortOrder == SortOrder.ASC ? builder.asc(sort) : builder.desc(sort);

        return em.createQuery(
                q
                        .select(c)
                        .where(predicate)
                        .orderBy(orderBy)
        )
                .setFirstResult(page * size)
                .setMaxResults(size)
                .getResultList();
    }

    private Long getFlightsCount(Filter filter) {
        CriteriaBuilder builder = em.getCriteriaBuilder();
        CriteriaQuery<Long> q = builder.createQuery(Long.class);
        Root<Flight> c = q.from(Flight.class);

        Join<Flight, Aircraft> aircraftFetch = c.join(Flight_.aircraft, JoinType.LEFT);
        aircraftFetch.join(Aircraft_.type, JoinType.LEFT);
        aircraftFetch.join(Aircraft_.airline, JoinType.LEFT);

        Join<Flight, Route> routeFetch = c.join(Flight_.route, JoinType.LEFT);
        routeFetch.join(Route_.airportFrom, JoinType.LEFT);
        routeFetch.join(Route_.airportTo, JoinType.LEFT);

        return em.createQuery(
                q
                        .select(builder.count(c.get(Flight_.id)))
                        .where(buildPredicate(filter, builder, c))
        ).getSingleResult();
    }


    private List<CodeNameValue> getTopAirport(Filter filter, int size,
                                              SingularAttribute<Route, Airport> a1,
                                              SingularAttribute<Route, Airport> a2) {

        CriteriaBuilder builder = em.getCriteriaBuilder();
        CriteriaQuery<CodeNameValue> q = builder.createQuery(CodeNameValue.class);

        Root<Flight> c = q.from(Flight.class);

        Join<Flight, Route> joinRoute = c.join(Flight_.route);
        Join<Route, Airport> joinAirport1 = joinRoute.join(a1);
        joinRoute.join(a2, JoinType.LEFT);

        Join<Flight, Aircraft> joinAircraft = c.join(Flight_.aircraft, JoinType.LEFT);
        joinAircraft.join(Aircraft_.airline, JoinType.LEFT);
        joinAircraft.join(Aircraft_.type, JoinType.LEFT);

        Path<String> fieldCode = joinAirport1.get(Airport_.code);
        Path<String> fieldName = joinAirport1.get(Airport_.name);
        Expression<Long> count = builder.count(c.get(Flight_.id));

        CompoundSelection<CodeNameValue> selection = builder.construct(CodeNameValue.class, fieldCode, fieldName, count);

        Predicate predicate = buildPredicate(filter, builder, c);

        return em.createQuery(q.select(selection).where(predicate).groupBy(fieldCode).orderBy(builder.desc(count)))
                .setMaxResults(size)
                .getResultList();
    }

    private Predicate buildPredicate(Filter filter, CriteriaBuilder builder, Root<Flight> c) {
        List<Predicate> predicates = new ArrayList<>();

        if (filter.getDateFrom().isPresent()) {
            predicates.add(builder.greaterThanOrEqualTo(c.get(Flight_.firstContact), filter.getDateFrom().get()));
        }

        if (filter.getDateTo().isPresent()) {
            predicates.add(builder.lessThanOrEqualTo(c.get(Flight_.lastContact), filter.getDateTo().get()));
        }

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
            predicates.add(c.get(Flight_.route).get(Route_.airportTo).get(Airport_.code).in(filter.getSet(FilterField.DESTINATIONS)));
        }

        return predicates.isEmpty() ?
                builder.isTrue(builder.literal(true)) : builder.and(predicates.toArray(new Predicate[0]));
    }
}
