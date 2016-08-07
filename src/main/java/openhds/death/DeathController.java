package openhds.death;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="/death")
public class DeathController extends openhds.ControllerBase<Death, DeathRequest> {
    @Autowired
    public DeathController(DeathClient client) {
        this.client = client;
    }
}
