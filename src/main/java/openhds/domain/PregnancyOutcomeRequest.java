package openhds.domain;

public class PregnancyOutcomeRequest extends Request {
    private PregnancyOutcome pregnancyOutcome;

    public PregnancyOutcome getPregnancyOutcome() {
        return pregnancyOutcome;
    }

    public void setPregnancyOutcome(PregnancyOutcome pregnancyOutcome) {
        this.pregnancyOutcome = pregnancyOutcome;
    }
}
