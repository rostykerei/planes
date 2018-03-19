package nl.rostykerei.planes.server.repository;

import nl.rostykerei.planes.server.model.Flight;
import nl.rostykerei.planes.server.request.Filter;
import nl.rostykerei.planes.server.response.CodeNameValue;
import nl.rostykerei.planes.server.response.DateValue;
import nl.rostykerei.planes.server.response.PairValue;
import nl.rostykerei.planes.server.response.Table;

import java.util.List;


public interface StatisticsRepository {

    enum SortColumn {
        ID, CALLSIGN, AIRLINE, FROM, TO, AIRCRAFT, TYPE, DATE
    }

    enum SortOrder {
        ASC, DESC
    }

    List<CodeNameValue> getTopTypes(Filter filter, int size);

    List<CodeNameValue> getTopAirlines(Filter filter, int size);

    List<DateValue> getFlightsPerHour(Filter filter);

    List<CodeNameValue> getTopOrigins(Filter filter, int size);

    List<CodeNameValue> getTopDestinations(Filter filter, int size);

    List<PairValue> getTopRoutes(Filter filter, int size);

    Table<Flight> getFlightsTable(Filter filter, SortColumn sortColumn, SortOrder sortOrder, int page, int size);
}
