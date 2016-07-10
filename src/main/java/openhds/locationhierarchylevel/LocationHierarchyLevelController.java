package openhds.locationhierarchylevel;

import openhds.RestClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value="/locationHierarchyLevel")
public class LocationHierarchyLevelController extends openhds.ControllerBase<LocationHierarchyLevel, LocationHierarchyLevelRequest> {
    @Autowired
    public LocationHierarchyLevelController(LocationHierarchyLevelClient client) {
        this.client = client;
    }
}