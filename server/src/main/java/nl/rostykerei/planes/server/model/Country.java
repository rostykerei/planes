package nl.rostykerei.planes.server.model;

import javax.persistence.*;

@Entity
@Table(name = "country")
public class Country {

    @Id
    @Column(name = "code", length = 2, nullable = false, unique = true)
    private String code;

    @Column(name = "name", nullable = false)
    private String name;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}