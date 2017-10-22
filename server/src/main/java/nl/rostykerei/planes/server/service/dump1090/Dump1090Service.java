package nl.rostykerei.planes.server.service.dump1090;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class Dump1090Service {

    private final RestTemplate restTemplate;

    private final Dump1090Config config;

    @Autowired
    public Dump1090Service(RestTemplateBuilder restTemplateBuilder, Dump1090Config config) {
        this.restTemplate = restTemplateBuilder.build();
        this.config = config;
    }

    public Dump1090Response getData() {
        return restTemplate.getForObject(config.getUrl(), Dump1090Response.class);
    }
}
