package nl.rostykerei.planes.server.service;

import nl.rostykerei.planes.server.model.Airport;
import nl.rostykerei.planes.server.model.Status;
import nl.rostykerei.planes.server.repository.AirportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Service
public class AirportService {

    private AirportRepository repository;

    @Autowired
    public AirportService(AirportRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public Airport findByCode(String code) {
        return repository.findById(code).orElse(null);
    }

    @Transactional
    public Airport findByIataCode(String iataCode) {
        return repository.findByIataCode(iataCode).orElse(null);
    }

}
