package openhds.outmigration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="/outMigration")
public class OutMigrationController extends openhds.ControllerBase<OutMigration, OutMIgrationRequest> {
    @Autowired
    public OutMigrationController(OutMigrationClient client) {
        this.client = client;
    }
}