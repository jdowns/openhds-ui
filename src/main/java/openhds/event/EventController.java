package openhds.event;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="/event")
public class EventController extends openhds.ControllerBase<Event, EventRequest> {
    @Autowired
    public EventController(EventClient client) {
        this.client = client;
    }
}

