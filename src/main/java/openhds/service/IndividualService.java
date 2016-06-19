package openhds.service;

import openhds.domain.Individual;
import openhds.domain.Request;
import org.springframework.stereotype.Service;

@Service
public class IndividualService extends HttpService {

    @Override
    public String createEntity(Request request) {
        return create("/individuals", request, Individual.class);
    }
}