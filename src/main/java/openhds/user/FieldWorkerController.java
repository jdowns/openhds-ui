package openhds.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="/fieldWorker")
public class FieldWorkerController extends openhds.ControllerBase<FieldWorker, Request> {
    @Autowired
    public FieldWorkerController(FieldWorkerClient client) {
        this.client = client;
    }
}