package nl.rostykerei.planes.server.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "airport", indexes = {
        @Index(name = "airport_iata_code_idx", columnList = "iata_code"),
        @Index(name = "airport_country_idx", columnList = "country")
})
public class Airport {

    @Id
    @Column(name = "code", length = 4, nullable = false, unique = true)
    private String code;

    @Column(name = "iata_code", length = 3, unique = true)
    private String iataCode;

    @ManyToOne(optional = false)
    @JoinColumn(name = "country", foreignKey = @ForeignKey(name = "airport_country_fk"), nullable = false)
    private Country country;

    @Column(name = "city")
    private String city;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "latitude", nullable = false)
    private float latitude;

    @Column(name = "longitude", nullable = false)
    private float longitude;

    @Column(name = "status", length = 16, nullable = false)
    @Enumerated(EnumType.STRING)
    private Status status;

    @Column(name = "last_updated", nullable = false)
    private Date lastUpdated;

}