package nl.rostykerei.planes.server.response;

public class CodeNameValue {

    private String code;

    private String name;

    private Long value;

    public CodeNameValue(String code, String name, Long value) {
        this.code = code;
        this.name = name;
        this.value = value;
    }

    public String getCode() {
        return code;
    }

    public String getName() {
        return name;
    }

    public Long getValue() {
        return value;
    }
}
