package nl.rostykerei.planes.server.response;

import nl.rostykerei.planes.server.model.Flight;
import nl.rostykerei.planes.server.model.FlightLog;

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
    private Integer squawk;
    private Float rssi;
    private long age;

    public FlightMapRow(FlightLog flightLog) {
        Flight flight = flightLog.getFlight();

        if (flight.getAircraft() != null && flight.getAircraft().getType() != null) {
            this.type = flight.getAircraft().getType().getType();
            this.classification = flight.getAircraft().getType().getClassification();
        }

        if (flight.getRoute() != null) {
            this.callsign = flight.getRoute().getCallsign();

            if (flight.getRoute().getAirportTo() != null) {
                this.to = flight.getRoute().getAirportTo().getCode();
            }

            if (flight.getRoute().getAirportFrom() != null) {
                this.from = flight.getRoute().getAirportFrom().getCode();
            }
        }

        this.id = flight.getId();
        this.lat = flightLog.getLatitude();
        this.lon = flightLog.getLongitude();
        this.heading = flightLog.getHeading();
        this.speed = flightLog.getSpeed();
        this.altitude = flightLog.getAltitude();
        this.verticalRate = flightLog.getVerticalRate();
        this.squawk = flightLog.getSquawk();
        this.rssi = flightLog.getRssi();

        this.age = System.currentTimeMillis() - flightLog.getTimestamp().getTime();
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

    public Integer getSquawk() {
        return squawk;
    }

    public Float getRssi() {
        return rssi;
    }

    public long getAge() {
        return age;
    }
}
