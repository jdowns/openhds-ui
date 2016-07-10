package openhds.relationship;
import openhds.RestClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value="/relationship")
public class RelationshipController extends openhds.ControllerBase<Relationship, RelationshipRequest> {
    @Autowired
    public RelationshipController(RestClient<Relationship> client) {
        this.client = client;
    }
}