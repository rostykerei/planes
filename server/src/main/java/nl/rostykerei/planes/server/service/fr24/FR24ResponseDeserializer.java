package nl.rostykerei.planes.server.service.fr24;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;

import java.io.IOException;
import java.util.Iterator;

public class FR24ResponseDeserializer extends JsonDeserializer {

    private final static int SUPPORTED_VERSION = 4;

    private final static String VERSION_NODE = "version";
    private final static String FLIGHT_NODE_PREFIX = "f";

    private final static int HEX_CODE = 0;
    private final static int LATITUDE = 1;
    private final static int LONGITUDE = 2;
    private final static int HEADING = 3;
    private final static int ALTITUDE = 4;
    private final static int SPEED = 5;
    private final static int SQUAWK = 6;
    private final static int RADAR = 7;
    private final static int TYPE = 8;
    private final static int REGISTRATION = 9;

    private final static int FROM = 11;
    private final static int TO = 12;
    private final static int FLIGHT = 13;
    private final static int ON_GROUND = 14;
    private final static int VERTICAL_RATE = 15;
    private final static int CALLSIGN = 16;

    @Override
    public FR24Response deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException {
        JsonNode node = jsonParser.getCodec().readTree(jsonParser);

        FR24Response response = new FR24Response();

        if (node.get(VERSION_NODE) == null || node.get(VERSION_NODE).asInt() != SUPPORTED_VERSION) {
            throw new JsonMappingException(jsonParser, "Unsupported FR24 JSON version");
        }

        for (Iterator<String> fieldNames = node.fieldNames(); fieldNames.hasNext(); ) {
            String field = fieldNames.next();

            JsonNode n = node.get(field);

            if (n.isArray() && field.startsWith(FLIGHT_NODE_PREFIX)) {
                FR24Response.Flight flight = new FR24Response.Flight();
                flight.setId(field);

                for (int i = 0; i < n.size(); i++) {
                    JsonNode el = n.get(i);

                    if (el != null) {
                        switch (i) {
                            case HEX_CODE:
                                flight.setHex(el.asText());
                                break;
                            case LATITUDE:
                                flight.setLatitude(el.asDouble());
                                break;
                            case LONGITUDE:
                                flight.setLongitude(el.asDouble());
                                break;
                            case HEADING:
                                flight.setHeading(el.asInt());
                                break;
                            case ALTITUDE:
                                flight.setAltitude(el.asInt());
                                break;
                            case SPEED:
                                flight.setSpeed(el.asInt());
                                break;
                            case SQUAWK:
                                flight.setSquawk(el.asText());
                                break;
                            case RADAR:
                                flight.setRadar(el.asText());
                                break;
                            case TYPE:
                                flight.setType(el.asText());
                                break;
                            case REGISTRATION:
                                flight.setReg(el.asText());
                                break;
                            case FROM:
                                flight.setFrom(el.asText());
                                break;
                            case TO:
                                flight.setTo(el.asText());
                                break;
                            case FLIGHT:
                                flight.setFlight(el.asText());
                                break;
                            case ON_GROUND:
                                flight.setOnGround(el.asBoolean());
                                break;
                            case VERTICAL_RATE:
                                flight.setVerticalRate(el.asInt());
                                break;
                            case CALLSIGN:
                                flight.setCallsign(el.asText());
                                break;
                        }
                    }
                }

                response.getFlights().add(flight);
            }
        }

        return response;
    }
}
