package openhds.service;

import openhds.domain.Relationship;
import openhds.domain.Request;
import org.springframework.stereotype.Service;

@Service
public class RelationshipService  extends HttpService {
    @Override
    public String createEntity(Request request) {
        return create("/relationships", request, Relationship.class);
    }
}