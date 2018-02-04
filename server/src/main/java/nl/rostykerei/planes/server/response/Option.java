package nl.rostykerei.planes.server.response;

public class Option {

    private String code;

    private String name;

    public Option(String code, String name) {
        this.code = code;
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public String getName() {
        return name;
    }
}
