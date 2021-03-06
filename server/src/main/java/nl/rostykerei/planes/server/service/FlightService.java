package nl.rostykerei.planes.server.service;

import nl.rostykerei.planes.server.model.Flight;
import nl.rostykerei.planes.server.model.Route;
import nl.rostykerei.planes.server.repository.FlightRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class FlightService {

    private AircraftService aircraftService;

    private FlightRepository flightRepository;

    public FlightService(AircraftService aircraftService, FlightRepository flightRepository) {
        this.aircraftService = aircraftService;
        this.flightRepository = flightRepository;
    }

    @Transactional
    public Flight checkInFlight(String aircraftCode, Route route) {
        Date now = new Date();

        Flight flight;

        Optional<Flight> optFlight = flightRepository
                .findByAircraftAndLastContact(aircraftCode, new Date(now.getTime() - 1800 * 1000));

        if (!optFlight.isPresent()) {
            flight = new Flight();

            flight.setFirstContact(now);

            flight.setAircraft(aircraftService.findOrCreate(aircraftCode));
            flight.setRoute(route);
        }
        else {
            flight = optFlight.get();

            if (flight.getRoute() == null && route != null) {
                flight.setRoute(route);
            }
        }

        flight.setLastContact(now);

        return flightRepository.save(flight);
    }

    @Transactional
    public Flight findById(int id) {
        return flightRepository.findById(id).orElse(null);
    }

    @Transactional
    public List<Flight> findActiveFlights() {
        Date lastContact = new Date(System.currentTimeMillis() - 60000);

        return flightRepository.findFlightsByLastContactAfter(lastContact);
    }

}
