package nl.rostykerei.planes.server.service;

import nl.rostykerei.planes.server.model.FlightLog;
import nl.rostykerei.planes.server.repository.FlightLogRepository;
import org.springframework.stereotype.Service;

import java.util.Date;

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
}
