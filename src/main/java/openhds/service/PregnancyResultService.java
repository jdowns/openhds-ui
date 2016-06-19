package openhds.service;

import openhds.domain.*;
import org.springframework.stereotype.Service;

@Service
public class PregnancyResultService extends HttpService {

    @Override
    public String createEntity(Request request) {
        return create("/pregnancyResults", request, PregnancyResult.class);
    }
}
