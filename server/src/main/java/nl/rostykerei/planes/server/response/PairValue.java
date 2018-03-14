package nl.rostykerei.planes.server.response;

public class PairValue {

    private String first;

    private String second;

    private long value;

    public PairValue(String first, String second, long value) {
        this.first = first;
        this.second = second;
        this.value = value;
    }

    public String getFirst() {
        return first;
    }

    public String getSecond() {
        return second;
    }

    public long getValue() {
        return value;
    }
}
