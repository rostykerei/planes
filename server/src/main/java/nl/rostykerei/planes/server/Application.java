package nl.rostykerei.planes.server;

import nl.rostykerei.planes.server.dump1090.Dump1090Json;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@SpringBootApplication
public class Application {

    @RequestMapping("/")
    String home() {
        RestTemplate restTemplate = new RestTemplate();
        Dump1090Json json = restTemplate.getForObject("http://mediacenter/dump1090/data/aircraft.json", Dump1090Json.class);

        return "Hello World! >>> " + json.getAircraft().size() + " aircrafts";
    }

    public static void main(String[] args) throws Exception {
        SpringApplication.run(Application.class, args);
    }
}
