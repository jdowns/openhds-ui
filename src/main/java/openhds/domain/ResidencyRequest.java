package openhds.domain;

public class ResidencyRequest extends Request {
    private Residency residency;

    public Residency getResidency() {
        return residency;
    }

    public void setResidency(Residency residency) {
        this.residency = residency;
    }
}
