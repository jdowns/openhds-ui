package openhds.locationhierarchy;
import openhds.RestClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value="/locationHierarchy")
public class LocationHierarchyController extends openhds.ControllerBase<LocationHierarchy, LocationHierarchyRequest> {
    @Autowired
    public LocationHierarchyController(RestClient<LocationHierarchy> client) {
        this.client = client;
    }
}