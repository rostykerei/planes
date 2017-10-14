package nl.rostykerei.planes.server.model;

import javax.persistence.*;

@Entity
@Table(name = "country", indexes = {
        @Index(name = "country_iso3_code_idx", columnList = "iso3_code")
})
public class Country {

    @Id
    @Column(name = "iso2_code", length = 2, nullable = false, unique = true)
    private String iso2Code;

    @Column(name = "iso3_code", length = 3, nullable = false, unique = true)
    private String iso3Code;

    @Column(name = "name", nullable = false)
    private String name;
}
