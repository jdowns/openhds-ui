package openhds.locationhierarchy;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="/locationHierarchy")
public class LocationHierarchyController extends openhds.ControllerBase<LocationHierarchy, LocationHierarchyRequest> {
    @Autowired
    public LocationHierarchyController(LocationHierarchyClient client) {
        this.client = client;
    }
}