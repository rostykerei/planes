package nl.rostykerei.planes.server.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "flight", indexes = {
        @Index(name = "flight_aircraft_idx", columnList = "aircraft"),
        @Index(name = "flight_route_idx", columnList = "route"),
        @Index(name = "flight_first_contact_idx", columnList = "first_contact"),
        @Index(name = "flight_last_contact_idx", columnList = "last_contact"),
})
public class Flight {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "aircraft", foreignKey = @ForeignKey(name = "flight_aircraft_fk"), nullable = false)
    private Aircraft aircraft;

    @ManyToOne
    @JoinColumn(name = "route", foreignKey = @ForeignKey(name = "flight_route_fk"))
    private Route route;

    @Column(name = "first_contact", nullable = false)
    private Date firstContact;

    @Column(name = "last_contact", nullable = false)
    private Date lastContact;

}