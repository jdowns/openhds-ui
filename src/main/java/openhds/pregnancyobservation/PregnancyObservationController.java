package openhds.pregnancyobservation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="/pregnancyObservation")
public class PregnancyObservationController extends openhds.ControllerBase<PregnancyObservation, PregnancyObservationRequest> {
    @Autowired
    public PregnancyObservationController(PregnancyObservationClient client) {
        this.client = client;
    }
}