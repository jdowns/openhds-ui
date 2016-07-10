package openhds.death;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value="/death")
public class DeathController extends openhds.ControllerBase<Model, Request> {
}
