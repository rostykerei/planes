package nl.rostykerei.planes.server.service.dump1090;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "dump1090")
public class Dump1090Config {

    private boolean enabled;

    private String url;

    private int updateRate;

    public boolean isEnabled() {
        return enabled;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public int getUpdateRate() {
        return updateRate;
    }

    public void setUpdateRate(int updateRate) {
        this.updateRate = updateRate;
    }
}
