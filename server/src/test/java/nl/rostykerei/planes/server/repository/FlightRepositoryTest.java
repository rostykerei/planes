package nl.rostykerei.planes.server.repository;

import nl.rostykerei.planes.server.model.Aircraft;
import nl.rostykerei.planes.server.model.Flight;
import nl.rostykerei.planes.server.model.Status;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
@Rollback
public class FlightRepositoryTest {

    @Autowired
    AircraftRepository aircraftRepository;

    @Autowired
    FlightRepository flightRepository;

    @Test
    public void findByAircraftAndLastModified() throws Exception {

        Aircraft aircraft = new Aircraft();
        aircraft.setCode("a1b2c3");
        aircraft.setStatus(Status.N);
        aircraft.setLastUpdated(new Date());

        aircraftRepository.save(aircraft);

        assertFalse(flightRepository.findByAircraftAndLastContact("a1b2c3", new Date(0L)).isPresent());

        Flight flight = new Flight();
        flight.setAircraft(aircraft);
        flight.setFirstContact(new Date(1000L));
        flight.setLastContact(new Date(1000L));

        flightRepository.save(flight);

        assertTrue(flightRepository.findByAircraftAndLastContact("a1b2c3", new Date(0L)).isPresent());
    }

}