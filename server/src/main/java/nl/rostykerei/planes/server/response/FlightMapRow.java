package nl.rostykerei.planes.server.response;

public class FlightMapRow {

    private int id;
    private Float lat;
    private Float lon;
    private Integer heading;
    private String type;

    public FlightMapRow(int id, Float lat, Float lon, Integer heading, String type) {
        this.id = id;
        this.lat = lat;
        this.lon = lon;
        this.heading = heading;
        this.type = type;
    }

    public int getId() {
        return id;
    }

    public Float getLat() {
        return lat;
    }

    public Float getLon() {
        return lon;
    }

    public Integer getHeading() {
        return heading;
    }

    public String getType() {
        return type;
    }
}
