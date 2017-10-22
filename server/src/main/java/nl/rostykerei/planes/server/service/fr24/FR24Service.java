package nl.rostykerei.planes.server.service.fr24;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import static org.springframework.http.HttpMethod.GET;

@Service
public class FR24Service {

    private final RestTemplate restTemplate;
    private final HttpHeaders headers = new HttpHeaders();

    public FR24Service(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder.build();
        this.headers.set("User-Agent", "curl/7.54.0");
    }

    public FR24Response getData() {
        ResponseEntity<FR24Response> response = restTemplate.exchange("http://data-live.flightradar24.com/zones/fcgi/feed.js?bounds=53.40,52.23,0.78,8.81&faa=1&mlat=1&flarm=1&adsb=1&gnd=0&air=1&vehicles=0&estimated=0&maxage=14400&gliders=1",
                GET,
                new HttpEntity<byte[]>(headers),
                FR24Response.class);


        return response.getBody();
    }
}
