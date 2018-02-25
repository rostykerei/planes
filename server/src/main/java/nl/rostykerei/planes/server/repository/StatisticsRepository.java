package nl.rostykerei.planes.server.repository;

import nl.rostykerei.planes.server.request.Filter;
import nl.rostykerei.planes.server.response.NameValue;

import java.util.List;


public interface StatisticsRepository {

    List<NameValue> getTopAircrafts(Filter filter, int size);

    List<NameValue> getTopAirlines(Filter filter, int size);

    List<NameValue> getTopOrigins(Filter filter, int size);

    List<NameValue> getTopDestinations(Filter filter, int size);
}
