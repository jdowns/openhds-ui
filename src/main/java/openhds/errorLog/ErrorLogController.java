package openhds.errorLog;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="/errorLogs")
public class ErrorLogController extends openhds.ControllerBase<ErrorLog, ErrorLogRequest> {
    @Autowired
    public ErrorLogController(ErrorLogClient client) {
        this.client = client;
    }
}
