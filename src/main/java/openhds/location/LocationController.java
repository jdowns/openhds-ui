package openhds.location;
import openhds.RestClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value="/location")
public class LocationController extends openhds.ControllerBase<Location, LocationRequest> {
    @Autowired
    public LocationController(RestClient<Location> client) {
        this.client = client;
    }
}