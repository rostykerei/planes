package nl.rostykerei.planes.server.service;

import nl.rostykerei.planes.server.model.Aircraft;
import nl.rostykerei.planes.server.model.Status;
import nl.rostykerei.planes.server.repository.AircraftRepository;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
@Rollback
public class AircraftServiceTest {


    @Autowired
    private AircraftService service;

    @Test
    public void findOrCreate() throws Exception {
        Assert.assertEquals(0, service.countAll());

        Aircraft aircraft = service.findOrCreate("a1b2c3");

        Assert.assertEquals("a1b2c3", aircraft.getCode());
        Assert.assertEquals(Status.NEW, aircraft.getStatus());
        Assert.assertNotNull(aircraft.getLastUpdated());

        Assert.assertEquals(1, service.countAll());

        Aircraft aircraft2 = service.findOrCreate("a1b2c3");

        Assert.assertEquals("a1b2c3", aircraft2.getCode());

        Assert.assertEquals(1, service.countAll());
    }

}