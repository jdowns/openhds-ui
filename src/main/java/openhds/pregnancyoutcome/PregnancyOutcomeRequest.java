package openhds.pregnancyoutcome;

public class PregnancyOutcomeRequest extends openhds.domain.Request {
    private PregnancyOutcome pregnancyOutcome;

    public PregnancyOutcome getPregnancyOutcome() {
        return pregnancyOutcome;
    }

    public void setPregnancyOutcome(PregnancyOutcome pregnancyOutcome) {
        this.pregnancyOutcome = pregnancyOutcome;
    }
}
