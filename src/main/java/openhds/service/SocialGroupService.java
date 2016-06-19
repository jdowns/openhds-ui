package openhds.service;

import openhds.domain.Request;
import openhds.domain.SocialGroup;
import openhds.domain.SocialGroupRequest;
import org.springframework.stereotype.Service;

@Service
public class SocialGroupService extends HttpService {
    @Override
    public String createEntity(Request request) {
        return create("/socialGroups", request, SocialGroup.class);
    }
}
