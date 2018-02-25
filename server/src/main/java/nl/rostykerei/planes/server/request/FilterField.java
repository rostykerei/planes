package nl.rostykerei.planes.server.request;

public enum FilterField {

    AIRCRAFTS("aircrafts"),
    TYPES("types"),
    AIRLINES("airlines"),
    ROUTES("routes"),
    ORIGINS("origins"),
    DESTINATIONS("destinations");

    private final String name;

    FilterField(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
