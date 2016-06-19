package openhds.domain;

public class PregnancyObservationRequest extends Request {
    private PregnancyObservation pregnancyObservation;

    public PregnancyObservation getPregnancyObservation() {
        return pregnancyObservation;
    }

    public void setPregnancyObservation(PregnancyObservation pregnancyObservation) {
        this.pregnancyObservation = pregnancyObservation;
    }
}
