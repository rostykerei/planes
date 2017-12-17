package nl.rostykerei.planes.server.model;

import javax.persistence.*;
import java.util.Date;


@Entity
@Table(name = "flight_log", indexes = {
        @Index(name = "flight_log_flight_idx", columnList = "flight"),
})
public class FlightLog {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "flight", foreignKey = @ForeignKey(name = "flight_log_flight_fk"), nullable = false)
    private Flight flight;

    @Column(name = "altitude")
    private Integer altitude;

    @Column(name = "speed")
    private Integer speed;

    @Column(name = "heading")
    private Integer heading;

    @Column(name = "vertical_rate")
    private Integer verticalRate;

    @Column(name = "latitude")
    private Float latitude;

    @Column(name = "longitude")
    private Float longitude;

    @Column(name = "squawk")
    private Integer squawk;

    @Column(name = "rssi")
    private Float rssi;

    @Column(name = "ts")
    private Date timestamp;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Flight getFlight() {
        return flight;
    }

    public void setFlight(Flight flight) {
        this.flight = flight;
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

    public Integer getHeading() {
        return heading;
    }

    public void setHeading(Integer heading) {
        this.heading = heading;
    }

    public Integer getVerticalRate() {
        return verticalRate;
    }

    public void setVerticalRate(Integer verticalRate) {
        this.verticalRate = verticalRate;
    }

    public Float getLatitude() {
        return latitude;
    }

    public void setLatitude(Float latitude) {
        this.latitude = latitude;
    }

    public Float getLongitude() {
        return longitude;
    }

    public void setLongitude(Float longitude) {
        this.longitude = longitude;
    }

    public Integer getSquawk() {
        return squawk;
    }

    public void setSquawk(Integer squawk) {
        this.squawk = squawk;
    }

    public Float getRssi() {
        return rssi;
    }

    public void setRssi(Float rssi) {
        this.rssi = rssi;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }
}