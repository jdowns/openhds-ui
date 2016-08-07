package openhds.residency;

public class Request extends openhds.domain.Request {
    private Residency residency;

    public Residency getResidency() {
        return residency;
    }

    public void setResidency(Residency residency) {
        this.residency = residency;
    }
}
