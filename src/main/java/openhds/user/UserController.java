package openhds.user;

import openhds.RestClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value="/user")
public class UserController extends openhds.ControllerBase<User, Request> {
    @Autowired
    public UserController(RestClient<User> client) {
        this.client = client;
    }
}