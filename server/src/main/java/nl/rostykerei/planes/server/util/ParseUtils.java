package nl.rostykerei.planes.server.util;

public class ParseUtils {

    public static String parseString(String str) {
        if (str != null) {
            str = str.trim();

            if (str.isEmpty()) {
                return null;
            }

            return str.toUpperCase();
        }

        return null;
    }
}
