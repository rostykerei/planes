package nl.rostykerei.planes.server.service;

import nl.rostykerei.planes.server.model.Airline;
import nl.rostykerei.planes.server.repository.AirlineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AirlineService {

    private AirlineRepository airlineRepository;

    @Autowired
    public AirlineService(AirlineRepository airlineRepository) {
        this.airlineRepository = airlineRepository;
    }

    @Transactional
    public Airline findByTwoCodes(String icaoCode, String iataCode) {
        return airlineRepository.findFirstByCodeAndIataCode(icaoCode, iataCode).orElse(null);
    }
}
