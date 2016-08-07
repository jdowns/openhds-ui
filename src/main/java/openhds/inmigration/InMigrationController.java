package openhds.inmigration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="/inMigration")
public class InMigrationController extends openhds.ControllerBase<InMigration, InMigrationRequest> {
    @Autowired
    public InMigrationController(InMigrationClient client) {
        this.client = client;
    }
}