package nl.rostykerei.planes.server.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "route", indexes = {
        @Index(name = "route_airline_fk", columnList = "airline"),
        @Index(name = "route_number_idx", columnList = "number"),
        @Index(name = "route_airport_from_idx", columnList = "airport_from"),
        @Index(name = "route_airport_to_idx", columnList = "airport_to")
})
public class Route {

    @Id
    @Column(name = "callsign", length = 8)
    private String callsign;

    @Column(name = "number", length = 8)
    private String number;

    @ManyToOne
    @JoinColumn(name = "airline", foreignKey = @ForeignKey(name = "route_airline_fk"))
    private Airline airline;

    @ManyToOne
    @JoinColumn(name = "airport_from", foreignKey = @ForeignKey(name = "route_airport_from_fk"))
    private Airport airportFrom;

    @ManyToOne
    @JoinColumn(name = "airport_to", foreignKey = @ForeignKey(name = "route_airport_to_fk"))
    private Airport airportTo;

    @Column(name = "status", length = 16, nullable = false)
    @Enumerated(EnumType.STRING)
    private Status status;

    @Column(name = "last_updated", nullable = false)
    private Date lastUpdated;
}