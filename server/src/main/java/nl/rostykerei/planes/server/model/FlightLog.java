package nl.rostykerei.planes.server.model;

import javax.persistence.*;


@Entity
@Table(name = "flight_log", indexes = {
        @Index(name = "flight_log_flight_idx", columnList = "flight_id"),
})
public class FlightLog {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "flight_id", foreignKey = @ForeignKey(name = "flight_log_flight_fk"), nullable = false)
    private Flight flight;

    @Column(name = "altitide")
    private Integer altitide;

    @Column(name = "speed")
    private Integer speed;

    @Column(name = "heading")
    private Integer heading;

    @Column(name = "latitude")
    private Float latitude;

    @Column(name = "longitude")
    private Float longitude;

}
