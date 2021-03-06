package nl.rostykerei.planes.server.controller;

import nl.rostykerei.planes.server.model.Flight;
import nl.rostykerei.planes.server.repository.StatisticsRepository;
import nl.rostykerei.planes.server.request.Filter;
import nl.rostykerei.planes.server.response.CodeNameValue;
import nl.rostykerei.planes.server.response.DateValue;
import nl.rostykerei.planes.server.response.PairValue;
import nl.rostykerei.planes.server.response.Table;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/stats")
public class StatisticsController {

    private final static int SIZE = 10;

    @Autowired
    private StatisticsRepository repository;

    @RequestMapping("/table")
    public Table<Flight> getFlights(Filter filter,
                                    @RequestParam(value = "sort", defaultValue = "id") String sort,
                                    @RequestParam(value = "order", defaultValue = "desc") String order,
                                    @RequestParam(value = "page", defaultValue = "0") int page,
                                    @RequestParam(value = "size", defaultValue = "25") int size) {

        StatisticsRepository.SortOrder tableSortOrder;
        StatisticsRepository.SortColumn tableSortColumn;

        switch (order) {
            case "asc":
                tableSortOrder = StatisticsRepository.SortOrder.ASC;
                break;
            default:
                tableSortOrder = StatisticsRepository.SortOrder.DESC;
                break;
        }

        switch (sort) {
            case "callsign":
                tableSortColumn = StatisticsRepository.SortColumn.CALLSIGN;
                break;
            case "airline":
                tableSortColumn = StatisticsRepository.SortColumn.AIRLINE;
                break;
            case "from":
                tableSortColumn = StatisticsRepository.SortColumn.FROM;
                break;
            case "to":
                tableSortColumn = StatisticsRepository.SortColumn.TO;
                break;
            case "aircraft":
                tableSortColumn = StatisticsRepository.SortColumn.AIRCRAFT;
                break;
            case "type":
                tableSortColumn = StatisticsRepository.SortColumn.TYPE;
                break;
            default:
                tableSortColumn = StatisticsRepository.SortColumn.ID;
                break;
        }

        return repository.getFlightsTable(
                filter,
                tableSortColumn,
                tableSortOrder, page, Math.min(size, 100)
        );
    }

    @RequestMapping("/types")
    public List<CodeNameValue> getTopTypes(Filter filter) {
        return repository.getTopTypes(filter, SIZE);
    }

    @RequestMapping("/airlines")
    public List<CodeNameValue> getTopAirlines(Filter filter) {
        return repository.getTopAirlines(filter, SIZE);
    }

    @RequestMapping("/flights")
    public List<DateValue> getFlight(Filter filter) {
        return repository.getFlightsPerHour(filter);
    }

    @RequestMapping("/origins")
    public List<CodeNameValue> getTopOrigins(Filter filter) {
        return repository.getTopOrigins(filter, SIZE);
    }

    @RequestMapping("/destinations")
    public List<CodeNameValue> getTopDestinations(Filter filter) {
        return repository.getTopDestinations(filter, SIZE);
    }

    @RequestMapping("/routes")
    public List<PairValue> getTopRoutes(Filter filter) {
        return repository.getTopRoutes(filter, SIZE);
    }
}
