package openhds.event;

import openhds.RestClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value="/event")
public class EventController extends openhds.ControllerBase<Event, EventRequest> {
    @Autowired
    public EventController(EventClient client) {
        this.client = client;
    }
}

