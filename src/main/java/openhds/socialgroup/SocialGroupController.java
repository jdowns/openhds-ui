package openhds.socialgroup;
import openhds.RestClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value="/socialGroup")
public class SocialGroupController extends openhds.ControllerBase<SocialGroup, SocialGroupRequest> {
    @Autowired
    public SocialGroupController(RestClient<SocialGroup> client) {
        this.client = client;
    }
}