package nl.rostykerei.planes.server;

import nl.rostykerei.planes.server.service.fr24.FR24Response;
import nl.rostykerei.planes.server.service.fr24.FR24Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SpringBootApplication
public class Application {

/*    @Autowired
    Dump1090Service dump1090Service;*/

    @Autowired
    FR24Service fr24Service;

    public static void main(String[] args) throws Exception {
        SpringApplication.run(Application.class, args);
    }

    @RequestMapping("/")
    String home() {
        //Dump1090Response json = dump1090Service.getData();

        FR24Response json = fr24Service.getData();

        return "Hello World! >>> " + json.getFlights().size() + " aircrafts";
    }
}
