package openhds.pregnancyresult;

public class Request extends openhds.domain.Request {
    private Model pregnancyResult;

    public Model getPregnancyResult() {
        return pregnancyResult;
    }

    public void setPregnancyResult(Model pregnancyResult) {
        this.pregnancyResult = pregnancyResult;
    }
}
