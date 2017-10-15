package nl.rostykerei.planes.server.model;

import javax.persistence.*;

@Entity
@Table(name = "aircraft_type", indexes = {
        @Index(name = "aircraft_type_manufacturer_idx", columnList = "manufacturer"),
        @Index(name = "aircraft_type_classification_idx", columnList = "classification")
})
public class AircraftType {

    @Id
    @Column(name = "type", length = 4, nullable = false, unique = true)
    private String type;

    @Column(name = "manufacturer")
    private String manufacturer;

    @Column(name = "model")
    private String model;

    @Column(name = "classification")
    private String classification;
}