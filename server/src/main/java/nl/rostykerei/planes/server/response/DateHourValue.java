package nl.rostykerei.planes.server.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.Date;

public class DateHourValue {

    private LocalDate date;

    @JsonIgnore
    private int hour;

    private long value;

    public DateHourValue(Date date, long value) {
        this(date, 0, value);
    }

    public DateHourValue(Date date, int hour, long value) {
        this.date = Instant.ofEpochMilli(date.getTime()).atZone(ZoneId.systemDefault()).toLocalDate();
        this.hour = hour;
        this.value = value;
    }

    @JsonProperty("date")
    public String getDate() {
        return LocalDateTime.of(date, LocalTime.of(hour, 0)).format(DateTimeFormatter.ISO_DATE_TIME);
    }


    public long getValue() {
        return value;
    }
}
