package nl.rostykerei.planes.server.response;

public class LngLat {

    private Float lat;
    private Float lon;

    public LngLat(Float lat, Float lon) {
        this.lat = lat;
        this.lon = lon;
    }

    public Float getLat() {
        return lat;
    }

    public Float getLon() {
        return lon;
    }
}
