package openhds.residency;
import openhds.RestClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value="/residency")
public class ResidencyController extends openhds.ControllerBase<Residency, Request> {
    @Autowired
    public ResidencyController(RestClient<Residency> client) {
        this.client = client;
    }
}