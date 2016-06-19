package openhds.service;

import openhds.domain.Request;
import openhds.domain.Residency;
import openhds.domain.ResidencyRequest;
import org.springframework.stereotype.Service;

@Service
public class ResidencyService extends HttpService {
    @Override
    public String createEntity(Request request) {
        return create("/residencies", request, Residency.class);
    }
}