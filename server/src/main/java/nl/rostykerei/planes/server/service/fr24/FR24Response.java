package nl.rostykerei.planes.server.service.fr24;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import java.util.ArrayList;
import java.util.List;

import static nl.rostykerei.planes.server.util.ParseUtils.parseString;

@JsonDeserialize(using = FR24ResponseDeserializer.class)
public class FR24Response {

    private List<Flight> flights = new ArrayList<>();

    public List<Flight> getFlights() {
        return flights;
    }

    public void setFlights(List<Flight> flights) {
        this.flights = flights;
    }

    public static class Flight {

        private String id;

        private String hex;

        private Double latitude;

        private Double longitude;

        private Integer heading;

        private Integer altitude;

        private Integer speed;

        private String squawk;

        private String radar;

        private String type;

        private String reg;

        private String from;

        private String to;

        private String flight;

        private Boolean onGround;

        private Integer verticalRate;

        private String callsign;

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public String getHex() {
            return hex;
        }

        public void setHex(String hex) {
            this.hex = parseString(hex);
        }

        public Double getLatitude() {
            return latitude;
        }

        public void setLatitude(Double latitude) {
            this.latitude = latitude;
        }

        public Double getLongitude() {
            return longitude;
        }

        public void setLongitude(Double longitude) {
            this.longitude = longitude;
        }

        public Integer getHeading() {
            return heading;
        }

        public void setHeading(Integer heading) {
            this.heading = heading;
        }

        public Integer getAltitude() {
            return altitude;
        }

        public void setAltitude(Integer altitude) {
            this.altitude = altitude;
        }

        public Integer getSpeed() {
            return speed;
        }

        public void setSpeed(Integer speed) {
            this.speed = speed;
        }

        public String getSquawk() {
            return squawk;
        }

        public void setSquawk(String squawk) {
            this.squawk = parseString(squawk);
        }

        public String getRadar() {
            return radar;
        }

        public void setRadar(String radar) {
            this.radar = parseString(radar);
        }

        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = parseString(type);
        }

        public String getReg() {
            return reg;
        }

        public void setReg(String reg) {
            this.reg = parseString(reg);
        }

        public String getFrom() {
            return from;
        }

        public void setFrom(String from) {
            this.from = parseString(from);
        }

        public String getTo() {
            return to;
        }

        public void setTo(String to) {
            this.to = parseString(to);
        }

        public String getFlight() {
            return flight;
        }

        public void setFlight(String flight) {
            this.flight = parseString(flight);
        }

        public Boolean getOnGround() {
            return onGround;
        }

        public void setOnGround(Boolean onGround) {
            this.onGround = onGround;
        }

        public Integer getVerticalRate() {
            return verticalRate;
        }

        public void setVerticalRate(Integer verticalRate) {
            this.verticalRate = verticalRate;
        }

        public String getCallsign() {
            return callsign;
        }

        public void setCallsign(String callsign) {
            this.callsign = parseString(callsign);
        }
    }
}
