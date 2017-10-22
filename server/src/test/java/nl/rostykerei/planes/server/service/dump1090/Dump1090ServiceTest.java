package nl.rostykerei.planes.server.service.dump1090;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.client.RestClientTest;
import org.springframework.context.annotation.Import;
import org.springframework.core.io.ClassPathResource;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.client.MockRestServiceServer;

import static org.junit.Assert.*;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;

@RunWith(SpringRunner.class)
@RestClientTest(Dump1090Service.class)
@Import(Dump1090Config.class)
public class Dump1090ServiceTest {

    @Autowired
    private MockRestServiceServer server;

    @Autowired
    private Dump1090Service service;

    @Test
    public void test1() throws Exception {
        this.server
                .expect(requestTo("/dump1090/data/aircraft.json"))
                .andRespond(
                        withSuccess(
                                new ClassPathResource("/json/dump1090/test1.json", Dump1090Response.class),
                                APPLICATION_JSON
                        )
                );

        Dump1090Response response = this.service.getData();

        assertNotNull(response);
        assertNotNull(response.getAircraft());

        assertEquals(5, response.getAircraft().size());

        Dump1090Response.Aircraft aircraft = response.getAircraft().get(0);

        assertEquals("4ca4e3", aircraft.getHex());
        assertEquals(7347, (int) aircraft.getSquawk());
        assertEquals("KLM975", aircraft.getFlight());
        assertEquals(52.252280, aircraft.getLat(), 0);
        assertEquals(4.668562, aircraft.getLon(), 0);
        assertEquals(0, (int) aircraft.getNucp());
        assertEquals(.9, aircraft.getSeenPos(), 0);
        assertEquals(2650, (int) aircraft.getAltitude());
        assertEquals(2496, (int) aircraft.getVertRate());
        assertEquals(224, (int) aircraft.getTrack());
        assertEquals("A0", aircraft.getCategory());
        assertEquals(801, (int) aircraft.getMessages());
        assertEquals(.1, aircraft.getSeen(), 0);
        assertEquals(-31.3, aircraft.getRssi(), 0);

        Dump1090Response.Aircraft aircraft2 = response.getAircraft().get(1);

        assertEquals("40615b", aircraft2.getHex());
        assertNull(aircraft2.getSquawk());
        assertNull(aircraft2.getFlight());
        assertNull(aircraft2.getLat());
        assertNull(aircraft2.getLon());
        assertNull(aircraft2.getNucp());
        assertNull(aircraft2.getSeenPos());
        assertNull(aircraft2.getAltitude());
        assertNull(aircraft2.getVertRate());
        assertNull(aircraft2.getTrack());
        assertNull(aircraft2.getCategory());
        assertEquals(7650, (int) aircraft2.getMessages());
        assertEquals(239.4, aircraft2.getSeen(), 0);
        assertEquals(-34.9, aircraft2.getRssi(), 0);
    }

}