package nl.rostykerei.planes.server.service.dump1090;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static nl.rostykerei.planes.server.util.ParseUtils.parseString;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Dump1090Response {

    private double now;

    private long messages;

    private List<Aircraft> aircraft = new ArrayList<>();

    public double getNow() {
        return now;
    }

    public void setNow(double now) {
        this.now = now;
    }

    public Date getNowDate() {
        return new Date(getNowMilliseconds());
    }

    public long getNowMilliseconds() {
        return (long) getNow() * 1000;
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

        private Float lat;

        private Float lon;

        private Integer nucp;

        @JsonProperty("seen_pos")
        private Float seenPos;

        private Integer altitude;

        @JsonProperty("vert_rate")
        private Integer vertRate;

        private Integer track;

        private Integer speed;

        private String category;

        private Integer messages;

        private Float seen;

        private Float rssi;

        public String getHex() {
            return hex;
        }

        public void setHex(String hex) {
            this.hex = parseString(hex);;
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
            this.flight = parseString(flight);
        }

        public Float getLat() {
            return lat;
        }

        public void setLat(Float lat) {
            this.lat = lat;
        }

        public Float getLon() {
            return lon;
        }

        public void setLon(Float lon) {
            this.lon = lon;
        }

        public Integer getNucp() {
            return nucp;
        }

        public void setNucp(Integer nucp) {
            this.nucp = nucp;
        }

        public Float getSeenPos() {
            return seenPos;
        }

        public void setSeenPos(Float seenPos) {
            this.seenPos = seenPos;
        }

        public Integer getAltitude() {
            return altitude;
        }

        public void setAltitude(Integer altitude) {
            this.altitude = altitude;
        }

        public Integer getVertRate() {
            return vertRate;
        }

        public void setVertRate(Integer vertRate) {
            this.vertRate = vertRate;
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
            this.category = parseString(category);
        }

        public Integer getMessages() {
            return messages;
        }

        public void setMessages(Integer messages) {
            this.messages = messages;
        }

        public Float getSeen() {
            return seen;
        }

        public void setSeen(Float seen) {
            this.seen = seen;
        }

        public Float getRssi() {
            return rssi;
        }

        public void setRssi(Float rssi) {
            this.rssi = rssi;
        }
    }
}
