package openhds.errorLog;

import openhds.RestClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value="/errorLogs")
public class ErrorLogController extends openhds.ControllerBase<ErrorLog, ErrorLogRequest> {
    @Autowired
    public ErrorLogController(RestClient<ErrorLog> client) {
        this.client = client;
    }
}
