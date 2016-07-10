package openhds.pregnancyresult;
import openhds.RestClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value="/pregnancyResult")
public class PregnancyResultController extends openhds.ControllerBase<PregnancyResult, PregnancyResultRequest> {
    @Autowired
    public PregnancyResultController(PregnancyResultClient client) {
        this.client = client;
    }
}