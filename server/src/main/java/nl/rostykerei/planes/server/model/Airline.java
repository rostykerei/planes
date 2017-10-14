package nl.rostykerei.planes.server.model;

import javax.persistence.*;

@Entity
@Table(name = "airline", indexes = {
        @Index(name = "airline_iata_code_idx", columnList = "iata_code"),
        @Index(name = "airline_country_iso2_code_idx", columnList = "country_iso2_code")
})
public class Airline {

    @Id
    @Column(name = "icao_code", length = 3, nullable = false, unique = true)
    private String icaoCode;

    @Column(name = "iata_code", length = 2, unique = true)
    private String iataCode;

    @ManyToOne
    @JoinColumn(name = "country_iso2_code", foreignKey = @ForeignKey(name = "airline_country_fk"))
    private Country country;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "callsign")
    private String callsign;
}
