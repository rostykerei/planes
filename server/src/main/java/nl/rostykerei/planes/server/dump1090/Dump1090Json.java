package nl.rostykerei.planes.server.dump1090;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Dump1090Json {

    private double now;

    private long messages;

    private List<Aircraft> aircraft = new ArrayList<>();

    public double getNow() {
        return now;
    }

    public void setNow(double now) {
        this.now = now;
    }

    public long getMessages() {
        return messages;
    }

    public void setMessages(long messages) {
        this.messages = messages;
    }

    public List<Aircraft> getAircraft() {
        return aircraft;
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Aircraft {

        private String hex;

        private Integer squawk;

        private String flight;

        private Double lat;

        private Double lon;

        private Integer nucp;

        private Double seen_pos;

        private Integer altitude;

        private Integer vert_rate;

        private Integer track;

        private Integer speed;

        private String category;

        private Integer messages;

        private Double seen;

        private Double rssi;

        public String getHex() {
            return hex;
        }

        public void setHex(String hex) {
            this.hex = hex;
        }

        public Integer getSquawk() {
            return squawk;
        }

        public void setSquawk(Integer squawk) {
            this.squawk = squawk;
        }

        public String getFlight() {
            return flight;
        }

        public void setFlight(String flight) {
            this.flight = flight;
        }

        public Double getLat() {
            return lat;
        }

        public void setLat(Double lat) {
            this.lat = lat;
        }

        public Double getLon() {
            return lon;
        }

        public void setLon(Double lon) {
            this.lon = lon;
        }

        public Integer getNucp() {
            return nucp;
        }

        public void setNucp(Integer nucp) {
            this.nucp = nucp;
        }

        public Double getSeen_pos() {
            return seen_pos;
        }

        public void setSeen_pos(Double seen_pos) {
            this.seen_pos = seen_pos;
        }

        public Integer getAltitude() {
            return altitude;
        }

        public void setAltitude(Integer altitude) {
            this.altitude = altitude;
        }

        public Integer getVert_rate() {
            return vert_rate;
        }

        public void setVert_rate(Integer vert_rate) {
            this.vert_rate = vert_rate;
        }

        public Integer getTrack() {
            return track;
        }

        public void setTrack(Integer track) {
            this.track = track;
        }

        public Integer getSpeed() {
            return speed;
        }

        public void setSpeed(Integer speed) {
            this.speed = speed;
        }

        public String getCategory() {
            return category;
        }

        public void setCategory(String category) {
            this.category = category;
        }

        public Integer getMessages() {
            return messages;
        }

        public void setMessages(Integer messages) {
            this.messages = messages;
        }

        public Double getSeen() {
            return seen;
        }

        public void setSeen(Double seen) {
            this.seen = seen;
        }

        public Double getRssi() {
            return rssi;
        }

        public void setRssi(Double rssi) {
            this.rssi = rssi;
        }
    }
}
