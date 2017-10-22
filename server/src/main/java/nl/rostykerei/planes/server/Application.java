package nl.rostykerei.planes.server;

import nl.rostykerei.planes.server.service.dump1090.Dump1090Response;
import nl.rostykerei.planes.server.service.dump1090.Dump1090Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SpringBootApplication
public class Application {

    @Autowired
    Dump1090Service dump1090Service;

    @RequestMapping("/")
    String home() {
        Dump1090Response json = dump1090Service.getData();

        return "Hello World! >>> " + json.getAircraft().size() + " aircrafts";
    }

    public static void main(String[] args) throws Exception {
        SpringApplication.run(Application.class, args);
    }
}
