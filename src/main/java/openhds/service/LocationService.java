package openhds.service;

import openhds.domain.Location;
import openhds.domain.LocationRequest;
import openhds.domain.Request;
import org.springframework.stereotype.Service;

@Service
public class LocationService extends HttpService {

    @Override
    public String createEntity(Request request) {
        return create("/locations", request, Location.class);
    }
}
