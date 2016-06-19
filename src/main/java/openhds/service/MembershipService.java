package openhds.service;

import openhds.domain.Membership;
import openhds.domain.Request;
import org.springframework.stereotype.Service;

@Service
public class MembershipService  extends HttpService {
    @Override
    public String createEntity(Request request) {
        return create("/memberships", request, Membership.class);
    }
}