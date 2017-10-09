package nl.rostykerei.planes.server.model;

import javax.persistence.*;

@Entity
@Table(name = "country")
public class Country {

    @Id
    @Column(name = "iso2_code", length = 2, nullable = false, unique = true)
    private String iso2Code;

    @Column(name = "iso3_code", length = 3, nullable = false, unique = true)
    private String iso3Code;

    @Column(name = "name", nullable = false)
    private String name;

    public String getIso2Code() {
        return iso2Code;
    }

    public String getIso3Code() {
        return iso3Code;
    }

    public String getName() {
        return name;
    }
}
