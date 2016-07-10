package openhds.projectcode;

public class ProjectCodeRequest extends openhds.domain.Request {
    private ProjectCode projectCode;

    public ProjectCode getProjectCode() {
        return projectCode;
    }

    public void setProjectCode(ProjectCode projectCode) {
        this.projectCode = projectCode;
    }
}

