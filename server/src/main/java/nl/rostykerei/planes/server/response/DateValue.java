package nl.rostykerei.planes.server.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Date;

public class DateValue {

    private long date;

    @JsonIgnore
    private int hour;

    private long value;

    public DateValue(Date date, long value) {
        this(date, 0, value);
    }

    public DateValue(Date date, int hour, long value) {
        this.date = date.getTime() + hour * 3600 * 1000;
        this.value = value;
    }

    @JsonProperty("date")
    public long getDate() {
        return this.date;
    }


    public long getValue() {
        return value;
    }
}
