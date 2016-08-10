package openhds.visit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="/visit")
public class VisitController extends openhds.ControllerBase<Visit, VisitRequest> {
    @Autowired
    public VisitController(VisitClient client) {
        this.client = client;
    }
}