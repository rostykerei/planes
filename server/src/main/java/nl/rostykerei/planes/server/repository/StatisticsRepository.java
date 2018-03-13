package nl.rostykerei.planes.server.repository;

import nl.rostykerei.planes.server.request.Filter;
import nl.rostykerei.planes.server.response.CodeNameValue;
import nl.rostykerei.planes.server.response.DateHourValue;

import java.util.List;


public interface StatisticsRepository {

    List<CodeNameValue> getTopTypes(Filter filter, int size);

    List<CodeNameValue> getTopAirlines(Filter filter, int size);

    List<DateHourValue> getFlightsPerHour(Filter filter);

    List<CodeNameValue> getTopOrigins(Filter filter, int size);

    List<CodeNameValue> getTopDestinations(Filter filter, int size);
}
