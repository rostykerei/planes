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
}