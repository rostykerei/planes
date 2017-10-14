package nl.rostykerei.planes.server.model;

import javax.persistence.*;

@Entity
@Table(name = "airport", indexes = {
        @Index(name = "airport_iata_code_idx", columnList = "iata_code"),
        @Index(name = "airport_country_iso2_code_idx", columnList = "country_iso2_code")
})
public class Airport {

    @Id
    @Column(name = "icao_code", length = 4, nullable = false, unique = true)
    private String icaoCode;

    @Column(name = "iata_code", length = 3, unique = true)
    private String iataCode;

    @ManyToOne(optional = false)
    @JoinColumn(name = "country_iso2_code", foreignKey = @ForeignKey(name = "airport_country_fk"), nullable = false)
    private Country country;

    @Column(name = "city")
    private String city;

    @Column(name = "name", nullable = false)
    private String name;

}
