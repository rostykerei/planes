package nl.rostykerei.planes.server.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "airline", indexes = {
        @Index(name = "airline_iata_code_idx", columnList = "iata_code"),
        @Index(name = "airline_country_idx", columnList = "country")
})
public class Airline {

    @Id
    @Column(name = "code", length = 3, nullable = false, unique = true)
    private String code;

    @Column(name = "iata_code", length = 2)
    private String iataCode;

    @ManyToOne
    @JoinColumn(name = "country", foreignKey = @ForeignKey(name = "airline_country_fk"))
    private Country country;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "callsign")
    private String callsign;

    @Column(name = "status", length = 16, nullable = false)
    @Enumerated(EnumType.STRING)
    private Status status;

    @Column(name = "last_updated", nullable = false)
    private Date lastUpdated;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getIataCode() {
        return iataCode;
    }

    public void setIataCode(String iataCode) {
        this.iataCode = iataCode;
    }

    public Country getCountry() {
        return country;
    }

    public void setCountry(Country country) {
        this.country = country;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCallsign() {
        return callsign;
    }

    public void setCallsign(String callsign) {
        this.callsign = callsign;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Date getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(Date lastUpdated) {
        this.lastUpdated = lastUpdated;
    }
}