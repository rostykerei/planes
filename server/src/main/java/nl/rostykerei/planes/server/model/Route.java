package nl.rostykerei.planes.server.model;

import javax.persistence.*;

@Entity
@Table(name = "route", indexes = {
        @Index(name = "route_number_idx", columnList = "number"),
        @Index(name = "route_number_idx", columnList = "number"),
        @Index(name = "route_airport_from_code_idx", columnList = "airport_from_code"),
        @Index(name = "route_airport_to_code_idx", columnList = "airport_to_code")
})
public class Route {

    @Id
    @Column(name = "callsign", length = 8)
    private String callsign;

    @Column(name = "number", length = 8)
    private String number;

    @ManyToOne
    @JoinColumn(name = "airline_code", foreignKey = @ForeignKey(name = "route_airline_fk"))
    private Airline airline;

    @ManyToOne
    @JoinColumn(name = "airport_from_code", foreignKey = @ForeignKey(name = "route_airport_from_fk"))
    private Airport airportFrom;

    @ManyToOne
    @JoinColumn(name = "airport_to_code", foreignKey = @ForeignKey(name = "route_airport_to_fk"))
    private Airport airportTo;
}
