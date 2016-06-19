package openhds.service;

import openhds.domain.Request;
import openhds.domain.Visit;
import org.springframework.stereotype.Service;

@Service
public class VisitService extends HttpService {
    @Override
    public String createEntity(Request request) {
        return create("/visits", request, Visit.class);
    }
}
