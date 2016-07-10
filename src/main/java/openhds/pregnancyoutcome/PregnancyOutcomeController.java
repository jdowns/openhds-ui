package openhds.pregnancyoutcome;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="/pregnancyOutcome")
public class PregnancyOutcomeController extends openhds.ControllerBase<PregnancyOutcome, PregnancyOutcomeRequest> {
    @Autowired
    public PregnancyOutcomeController(PregnancyOutcomeClient client) {
        this.client = client;
    }
}