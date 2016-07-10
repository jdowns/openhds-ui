package openhds.individual;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="/individual")
public class IndividualController extends openhds.ControllerBase<Individual, IndividualRequest> {
    @Autowired
    public IndividualController(IndividualClient client) {
        this.client = client;
    }
}