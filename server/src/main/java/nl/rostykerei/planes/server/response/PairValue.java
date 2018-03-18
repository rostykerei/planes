package nl.rostykerei.planes.server.response;

public class PairValue {

    private String firstCode;
    private String firstName;

    private String secondCode;
    private String secondName;

    private long value;

    public PairValue(String firstCode, String firstName, String secondCode, String secondName, long value) {
        this.firstCode = firstCode;
        this.firstName = firstName;
        this.secondCode = secondCode;
        this.secondName = secondName;
        this.value = value;
    }

    public String getFirstCode() {
        return firstCode;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getSecondCode() {
        return secondCode;
    }

    public String getSecondName() {
        return secondName;
    }

    public long getValue() {
        return value;
    }
}
