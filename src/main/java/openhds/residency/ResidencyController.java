package openhds.residency;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="/residency")
public class ResidencyController extends openhds.ControllerBase<Residency, Request> {
    @Autowired
    public ResidencyController(ResidencyClient client) {
        this.client = client;
    }
}