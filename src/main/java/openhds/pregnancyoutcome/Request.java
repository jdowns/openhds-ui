package openhds.pregnancyoutcome;

public class Request extends openhds.domain.Request {
    private Model pregnancyOutcome;

    public Model getPregnancyOutcome() {
        return pregnancyOutcome;
    }

    public void setPregnancyOutcome(Model pregnancyOutcome) {
        this.pregnancyOutcome = pregnancyOutcome;
    }
}
