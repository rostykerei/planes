package nl.rostykerei.planes.server.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "flight", indexes = {
        @Index(name = "flight_aircraft_code_idx", columnList = "aircraft_code"),
        @Index(name = "flight_route_callsign_idx", columnList = "route_callsign"),
        @Index(name = "flight_first_contact_idx", columnList = "first_contact"),
        @Index(name = "flight_last_contact_idx", columnList = "last_contact"),
})
public class Flight {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "aircraft_code", foreignKey = @ForeignKey(name = "flight_aircraft_fk"), nullable = false)
    private Aircraft aircraft;

    @ManyToOne(optional = false)
    @JoinColumn(name = "route_callsign", foreignKey = @ForeignKey(name = "flight_route_fk"), nullable = false)
    private Route route;

    @Column(name = "first_contact", nullable = false)
    private Date firstContact;

    @Column(name = "last_contact", nullable = false)
    private Date lastContact;

}
