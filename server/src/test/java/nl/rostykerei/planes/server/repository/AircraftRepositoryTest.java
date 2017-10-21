package nl.rostykerei.planes.server.repository;

import nl.rostykerei.planes.server.model.Aircraft;
import nl.rostykerei.planes.server.model.Status;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@Rollback
public class AircraftRepositoryTest {

    @Autowired
    private AircraftRepository repository;

    @Test
    public void findOrCreate() throws Exception {

        Assert.assertEquals(0, repository.count());

        Aircraft aircraft = repository.findOrCreate("a1b2c3");

        Assert.assertEquals("a1b2c3", aircraft.getCode());
        Assert.assertEquals(Status.NEW, aircraft.getStatus());
        Assert.assertNotNull(aircraft.getLastUpdated());

        Assert.assertEquals(1, repository.count());

        aircraft.setRegistration("PH-TEST");

        repository.save(aircraft);

        Aircraft aircraft2 = repository.findOrCreate("a1b2c3");

        Assert.assertEquals("a1b2c3", aircraft2.getCode());
        Assert.assertEquals("PH-TEST", aircraft2.getRegistration());

        Assert.assertEquals(1, repository.count());
    }

}