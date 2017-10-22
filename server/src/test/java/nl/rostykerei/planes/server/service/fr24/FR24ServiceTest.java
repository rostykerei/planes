package nl.rostykerei.planes.server.service.fr24;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.client.RestClientTest;
import org.springframework.core.io.ClassPathResource;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.client.MockRestServiceServer;

import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;

@RunWith(SpringRunner.class)
@RestClientTest(FR24Service.class)
public class FR24ServiceTest {

    @Autowired
    private MockRestServiceServer server;

    @Autowired
    private FR24Service service;

    @Test
    public void test1() throws Exception {
        this.server
                .expect(requestTo("http://data-live.flightradar24.com/zones/fcgi/feed.js?bounds=53.40,52.23,0.78,8.81&faa=1&mlat=1&flarm=1&adsb=1&gnd=0&air=1&vehicles=0&estimated=0&maxage=14400&gliders=1"))
                .andRespond(
                        withSuccess(
                                new ClassPathResource("/json/fr24/test1.json", FR24Response.class),
                                APPLICATION_JSON
                        )
                );

        FR24Response response = service.getData();

        System.out.println(response);
    }

}