package nl.rostykerei.planes.server.response;

public class NameValue {

    private String name;

    private Long value;

    public NameValue(String name, Long value) {
        this.name = name;
        this.value = value;
    }

    public String getName() {
        return name;
    }

    public Long getValue() {
        return value;
    }
}
