package openhds.visit;

public class Request extends openhds.domain.Request {
    private Model visit;

    public Model getVisit() {
        return visit;
    }

    public void setVisit(Model visit) {
        this.visit = visit;
    }
}
