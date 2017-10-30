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
}