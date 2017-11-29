package nl.rostykerei.planes.server.response;

public class FlightMapRow {

    private int id;
    private Float lat;
    private Float lon;
    private Integer heading;
    private Integer speed;
    private Integer altitude;
    private Integer verticalRate;
    private String type;
    private String classification;
    private String callsign;
    private String from;
    private String to;

    public FlightMapRow(int id, Float lat, Float lon, Integer heading,
                        Integer speed, Integer altitude, Integer verticalRate,
                        String type, String classification, String callsign, String from, String to) {
        this.id = id;
        this.lat = lat;
        this.lon = lon;
        this.heading = heading;
        this.speed = speed;
        this.altitude = altitude;
        this.verticalRate = verticalRate;
        this.type = type;
        this.classification = classification;
        this.callsign = callsign;
        this.from = from;
        this.to = to;
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

    public Integer getSpeed() {
        return speed;
    }

    public Integer getAltitude() {
        return altitude;
    }

    public Integer getVerticalRate() {
        return verticalRate;
    }

    public String getType() {
        return type;
    }

    public String getClassification() {
        return classification;
    }

    public String getCallsign() {
        return callsign;
    }

    public String getFrom() {
        return from;
    }

    public String getTo() {
        return to;
    }
}
