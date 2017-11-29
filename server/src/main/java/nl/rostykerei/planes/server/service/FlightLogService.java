package nl.rostykerei.planes.server.service;

import nl.rostykerei.planes.server.model.Flight;
import nl.rostykerei.planes.server.model.FlightLog;
import nl.rostykerei.planes.server.repository.FlightLogRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class FlightLogService {

    private FlightLogRepository flightLogRepository;

    public FlightLogService(FlightLogRepository flightLogRepository) {
        this.flightLogRepository = flightLogRepository;
    }

    public FlightLog create(FlightLog flightLog) {
        flightLog.setTimestamp(new Date());

        return flightLogRepository.save(flightLog);
    }

    public Optional<FlightLog> findLastFlightLog(Flight flight) {
        List<FlightLog> res = flightLogRepository.findLastFlightLogs(flight, PageRequest.of(0, 1));

        if (res.size() == 0) {
            return Optional.empty();
        }

        return Optional.of(res.get(0));
    }

    public List<FlightLog> findFlightLogsByFlightId(Integer flightId) {
        return flightLogRepository.findByFlightId(flightId);
    }
}
