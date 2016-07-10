package openhds.death;

import openhds.RestClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value="/death")
public class DeathController extends openhds.ControllerBase<Death, DeathRequest> {
    @Autowired
    public DeathController(RestClient<Death> client) {
        this.client = client;
    }
}
