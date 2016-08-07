package openhds.socialgroup;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="/socialGroup")
public class SocialGroupController extends openhds.ControllerBase<SocialGroup, SocialGroupRequest> {
    @Autowired
    public SocialGroupController(SocialGroupClient client) {
        this.client = client;
    }
}