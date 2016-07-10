package openhds.relationship;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="/relationship")
public class RelationshipController extends openhds.ControllerBase<Relationship, RelationshipRequest> {
    @Autowired
    public RelationshipController(RelationshipClient client) {
        this.client = client;
    }
}