package nl.rostykerei.planes.server.rest;

import nl.rostykerei.planes.server.model.Flight;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

@RepositoryRestResource(collectionResourceRel = "zzzs", path = "zzz")
public interface FlightRestRepository extends Repository<Flight, Integer> {

    @Query("SELECT f from Flight f where f.id = 5")
    @RestResource(path = "/test")
    Flight testCall();

    Page<Flight> findAll(Pageable pageable);
}
