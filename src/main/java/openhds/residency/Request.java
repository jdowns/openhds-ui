package openhds.residency;

public class Request extends openhds.domain.Request {
    private Model residency;

    public Model getResidency() {
        return residency;
    }

    public void setResidency(Model residency) {
        this.residency = residency;
    }
}
