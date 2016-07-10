package openhds.individual;
import openhds.RestClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value="/individual")
public class IndividualController extends openhds.ControllerBase<Individual, IndividualRequest> {
    @Autowired
    public IndividualController(IndividualClient client) {
        this.client = client;
    }
}