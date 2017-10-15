package nl.rostykerei.planes.server.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "aircraft", indexes = {
        @Index(name = "aircraft_airline_idx", columnList = "airline"),
        @Index(name = "aircraft_reg_compact_idx", columnList = "reg_compact"),
        @Index(name = "aircraft_type_idx", columnList = "type"),
})
public class Aircraft {

    @Id
    @Column(name = "code", length = 6, nullable = false, unique = true)
    private String code;

    @ManyToOne
    @JoinColumn(name = "airline", foreignKey = @ForeignKey(name = "aircraft_airline_fk"))
    private Airline airline;

    @Column(name = "reg", length = 16)
    private String registration;

    @Column(name = "reg_compact", length = 16)
    private String registrationCompact;

    @ManyToOne
    @JoinColumn(name = "type", foreignKey = @ForeignKey(name = "aircraft_type_fk"))
    private AircraftType type;

    @Column(name = "model")
    private String model;

    @Column(name = "status", length = 16, nullable = false)
    @Enumerated(EnumType.STRING)
    private Status status;

    @Column(name = "last_updated", nullable = false)
    private Date lastUpdated;

}