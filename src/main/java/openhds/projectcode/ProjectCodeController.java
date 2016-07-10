package openhds.projectcode;

import openhds.RestClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value="/projectCode")
public class ProjectCodeController extends openhds.ControllerBase<ProjectCode, ProjectCodeRequest> {
    @Autowired
    public ProjectCodeController(ProjectCodeClient client) {
        this.client = client;
    }
}