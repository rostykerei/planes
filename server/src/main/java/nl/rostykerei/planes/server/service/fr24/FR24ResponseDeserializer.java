package nl.rostykerei.planes.server.service.fr24;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.ObjectCodec;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;

import java.io.IOException;
import java.util.Iterator;

public class FR24ResponseDeserializer extends JsonDeserializer {

    @Override
    public FR24Response deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException {
        ObjectCodec oc = jsonParser.getCodec();
        JsonNode node = oc.readTree(jsonParser);

        FR24Response response = new FR24Response();

        response.setVersion(node.get("version").asInt());

        for (Iterator<String> fieldNames = node.fieldNames(); fieldNames.hasNext(); ) {
            String field = fieldNames.next();

            JsonNode n = node.get(field);

            if (field.startsWith("f") && n.isArray()) {
                FR24Response.Flight flight = new FR24Response.Flight();

                flight.setId(field);
                flight.setHex(n.get(0) != null ? n.get(0).asText() : null);
                flight.setLatitude(n.get(1) != null ? n.get(1).asDouble() : null);
                flight.setLongitude(n.get(2) != null ? n.get(2).asDouble() : null);
                flight.setHeading(n.get(3) != null ? n.get(3).asInt() : null);
                flight.setAltitude(n.get(4) != null ? n.get(4).asInt() : null);
                flight.setSpeed(n.get(5) != null ? n.get(5).asInt() : null);
                flight.setSquawk(n.get(6) != null ? n.get(6).asText() : null);
                flight.setRadar(n.get(7) != null ? n.get(7).asText() : null);
                flight.setType(n.get(8) != null ? n.get(8).asText() : null);
                flight.setReg(n.get(9) != null ? n.get(9).asText() : null);
                flight.setFrom(n.get(11) != null ? n.get(11).asText() : null);
                flight.setTo(n.get(12) != null ? n.get(12).asText() : null);
                flight.setFlight(n.get(13) != null ? n.get(13).asText() : null);
                flight.setVerticalRate(n.get(15) != null ? n.get(15).asInt() : null);
                flight.setCallsign(n.get(16) != null ? n.get(16).asText() : null);

                response.getFlights().add(flight);
            }
        }

        return response;
    }
}
