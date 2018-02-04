package nl.rostykerei.planes.server.response;

public class OptionWithFlag extends Option {

    private String flag;


    public OptionWithFlag(String code, String name, String flag) {
        super(code, name);
        this.flag = flag;
    }

    public String getFlag() {
        return flag;
    }
}
