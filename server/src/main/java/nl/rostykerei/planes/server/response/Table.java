package nl.rostykerei.planes.server.response;

import java.util.List;

public class Table<T> {

    private List<T> table;

    private Long total;

    public Table(List<T> table, Long total) {
        this.table = table;
        this.total = total;
    }

    public List<T> getTable() {
        return table;
    }

    public Long getTotal() {
        return total;
    }
}
