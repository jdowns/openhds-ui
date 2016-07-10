package openhds.visit;
import openhds.RestClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value="/visit")
public class VisitController extends openhds.ControllerBase<Visit, VisitRequest> {
    @Autowired
    public VisitController(RestClient<Visit> client) {
        this.client = client;
    }
}