package openhds.service;

import openhds.domain.Individual;
import openhds.domain.Request;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IndividualService extends HttpService {

    @Override
    public String createEntity(Request request) {
        return create("/individuals", request, Individual.class);
    }

    public List<Individual> getIndividuals(String locationUUID) {
        return null;
    }
}