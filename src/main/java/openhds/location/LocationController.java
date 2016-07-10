package openhds.location;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="/api/location")
public class LocationController extends openhds.ControllerBase<Location, LocationRequest> {
    @Autowired
    public LocationController(LocationClient client) {
        this.client = client;
    }
}