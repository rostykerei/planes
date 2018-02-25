package nl.rostykerei.planes.server.request;

import java.util.*;

public class Filter {

    private Optional<Date> dateFrom = Optional.empty();
    private Optional<Date> dateTo = Optional.empty();;

    private Map<FilterField, Set<String>> map = new HashMap<>();

    public Optional<Date> getDateFrom() {
        return dateFrom;
    }

    public void setDateFrom(Optional<Date> dateFrom) {
        this.dateFrom = dateFrom;
    }

    public Optional<Date> getDateTo() {
        return dateTo;
    }

    public void setDateTo(Optional<Date> dateTo) {
        this.dateTo = dateTo;
    }

    public Set<FilterField> getSets() {
        return map.keySet();
    }

    public Set<String> getSet(FilterField field) {
        if (!map.containsKey(field)) {
            map.put(field, new HashSet<>());
        }

        return map.get(field);
    }
}
