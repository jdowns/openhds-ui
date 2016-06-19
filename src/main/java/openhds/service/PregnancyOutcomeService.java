package openhds.service;

import openhds.domain.*;
import org.springframework.stereotype.Service;

@Service
public class PregnancyOutcomeService extends HttpService {

    @Override
    public String createEntity(Request request) {
        return create("/pregnancyOutcomes", request, PregnancyOutcome.class);
    }
}
