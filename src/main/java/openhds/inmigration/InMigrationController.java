package openhds.inmigration;
import openhds.RestClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value="/inMigration")
public class InMigrationController extends openhds.ControllerBase<InMigration, InMigrationRequest> {
    @Autowired
    public InMigrationController(RestClient<InMigration> client) {
        this.client = client;
    }
}