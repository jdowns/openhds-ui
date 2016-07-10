package openhds.pregnancyobservation;
import openhds.RestClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value="/pregnancyObservation")
public class PregnancyObservationController extends openhds.ControllerBase<PregnancyObservation, PregnancyObservationRequest> {
    @Autowired
    public PregnancyObservationController(RestClient<PregnancyObservation> client) {
        this.client = client;
    }
}