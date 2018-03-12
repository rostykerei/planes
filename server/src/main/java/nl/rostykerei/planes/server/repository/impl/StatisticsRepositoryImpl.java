package nl.rostykerei.planes.server.repository.impl;

import nl.rostykerei.planes.server.model.*;
import nl.rostykerei.planes.server.repository.StatisticsRepository;
import nl.rostykerei.planes.server.request.Filter;
import nl.rostykerei.planes.server.request.FilterField;
import nl.rostykerei.planes.server.response.CodeNameValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.criteria.*;
import javax.persistence.metamodel.SingularAttribute;
import java.util.ArrayList;
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
    public List<CodeNameValue> getTopOrigins(Filter filter, int size) {
        return getTopAirport(filter, size, Route_.airportFrom, Route_.airportTo);
    }

    @Override
    public List<CodeNameValue> getTopDestinations(Filter filter, int size) {
        return getTopAirport(filter, size, Route_.airportTo, Route_.airportFrom);
    }

    private List<CodeNameValue> getTopAirport(Filter filter, int size,
                                             SingularAttribute<Route, Airport> a1, SingularAttribute<Route, Airport> a2) {

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

        Predicate predicate = builder.isTrue(builder.literal(true));

        if (!predicates.isEmpty()) {
            predicate = builder.and(predicates.toArray(new Predicate[0]));
        }

        return predicate;
    }
}
