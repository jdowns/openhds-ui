package openhds.visit;

public class VisitRequest extends openhds.domain.Request {
    private Visit visit;

    public Visit getVisit() {
        return visit;
    }

    public void setVisit(Visit visit) {
        this.visit = visit;
    }
}
