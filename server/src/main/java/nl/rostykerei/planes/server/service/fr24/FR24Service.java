package nl.rostykerei.planes.server.service.fr24;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class FR24Service {

    private final FR24Config config;

    private final RestTemplate restTemplate;
    private final HttpHeaders headers = new HttpHeaders();

    @Autowired
    public FR24Service(RestTemplateBuilder restTemplateBuilder, FR24Config config) {
        this.config = config;

        this.restTemplate = restTemplateBuilder.build();
        this.headers.set(HttpHeaders.USER_AGENT, this.config.getUserAgent());
    }

    public FR24Response getData() {
        return restTemplate.exchange(
                config.getUrl(),
                HttpMethod.GET,
                new HttpEntity<byte[]>(headers),
                FR24Response.class
        ).getBody();
    }
}
