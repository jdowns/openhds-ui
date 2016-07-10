package openhds.pregnancyobservation;

public class PregnancyObservationRequest extends openhds.domain.Request {
    private PregnancyObservation pregnancyObservation;

    public PregnancyObservation getPregnancyObservation() {
        return pregnancyObservation;
    }

    public void setPregnancyObservation(PregnancyObservation pregnancyObservation) {
        this.pregnancyObservation = pregnancyObservation;
    }
}
