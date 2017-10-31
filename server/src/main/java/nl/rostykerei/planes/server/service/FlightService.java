package nl.rostykerei.planes.server.service;

import nl.rostykerei.planes.server.model.Flight;
import nl.rostykerei.planes.server.model.Route;
import nl.rostykerei.planes.server.repository.FlightRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class FlightService {

    private AircraftService aircraftService;

    private FlightRepository flightRepository;

    public FlightService(AircraftService aircraftService, FlightRepository flightRepository) {
        this.aircraftService = aircraftService;
        this.flightRepository = flightRepository;
    }

    public Flight checkInFlight(String aircraftCode, Route route) {
        Date now = new Date();

        Flight flight;

        Optional<Flight> optFlight = flightRepository
                .findByAircraftAndLastModified(aircraftCode, new Date(now.getTime() - 3600 * 1000));

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

}
