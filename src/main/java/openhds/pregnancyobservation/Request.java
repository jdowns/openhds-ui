package openhds.pregnancyobservation;

public class Request extends openhds.domain.Request {
    private Model pregnancyObservation;

    public Model getPregnancyObservation() {
        return pregnancyObservation;
    }

    public void setPregnancyObservation(Model pregnancyObservation) {
        this.pregnancyObservation = pregnancyObservation;
    }
}
