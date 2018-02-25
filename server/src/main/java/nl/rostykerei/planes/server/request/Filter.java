package nl.rostykerei.planes.server.request;

import java.util.Date;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

public class Filter {

    private Optional<Date> dateFrom = Optional.empty();
    private Optional<Date> dateTo = Optional.empty();;

    private Set<String> aircrafts = new HashSet<>();
    private Set<String> types = new HashSet<>();
    private Set<String> airlines = new HashSet<>();
    private Set<String> routes = new HashSet<>();
    private Set<String> origins = new HashSet<>();
    private Set<String> destinations = new HashSet<>();

    public Optional<Date> getDateFrom() {
        return dateFrom;
    }

    public Optional<Date> getDateTo() {
        return dateTo;
    }

    public void setDateFrom(Optional<Date> dateFrom) {
        this.dateFrom = dateFrom;
    }

    public void setDateTo(Optional<Date> dateTo) {
        this.dateTo = dateTo;
    }

    public Set<String> getAircrafts() {
        return aircrafts;
    }

    public Set<String> getTypes() {
        return types;
    }

    public Set<String> getAirlines() {
        return airlines;
    }

    public Set<String> getRoutes() {
        return routes;
    }

    public Set<String> getOrigins() {
        return origins;
    }

    public Set<String> getDestinations() {
        return destinations;
    }
}
