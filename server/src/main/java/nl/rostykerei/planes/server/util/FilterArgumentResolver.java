package nl.rostykerei.planes.server.util;

import nl.rostykerei.planes.server.request.Filter;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

@Component
public class FilterArgumentResolver implements HandlerMethodArgumentResolver {

    @Override
    public boolean supportsParameter(MethodParameter methodParameter) {
        return Filter.class.equals(methodParameter.getParameterType());
    }

    @Override
    public Filter resolveArgument(MethodParameter methodParameter, ModelAndViewContainer modelAndViewContainer, NativeWebRequest nativeWebRequest, WebDataBinderFactory webDataBinderFactory) {
        Filter filter = new Filter();

        Map<String, String[]> params = nativeWebRequest.getParameterMap();

        filter.setDateFrom(parseDate(nativeWebRequest, "dateFrom"));
        filter.setDateTo(parseDate(nativeWebRequest, "dateTo"));

        populateSet(params, "aircrafts", filter.getAircrafts());
        populateSet(params, "types", filter.getTypes());
        populateSet(params, "airlines", filter.getAirlines());
        populateSet(params, "routes", filter.getRoutes());
        populateSet(params, "origins", filter.getOrigins());
        populateSet(params, "destinations", filter.getDestinations());

        return filter;
    }

    private Optional<Date> parseDate(NativeWebRequest request, String name) {
        String dateString = request.getParameter(name);

        if (StringUtils.hasText(dateString)) {
            try {
                Date date = new SimpleDateFormat("dd-MM-yyyy").parse(dateString);
                return Optional.of(date);
            }
            catch (ParseException e) {
                return Optional.empty();
            }
        }

        return Optional.empty();
    }

    private void populateSet(Map<String, String[]> params, String name, Set<String> set) {
        if (params.containsKey(name)) {
            for (String val : params.get(name)) {
                if (StringUtils.hasText(val)) {
                    set.add(val);
                }
            }
        }
    }
}
