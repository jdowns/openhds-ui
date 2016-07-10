package openhds.membership;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="/Membership")
public class MembershipController extends openhds.ControllerBase<Membership, MembershipRequest> {
    @Autowired
    public MembershipController(MembershipClient client) {
        this.client = client;
    }
}