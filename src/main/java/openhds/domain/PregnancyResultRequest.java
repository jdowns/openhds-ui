package openhds.domain;

public class PregnancyResultRequest extends Request {
    private PregnancyResult pregnancyResult;

    public PregnancyResult getPregnancyResult() {
        return pregnancyResult;
    }

    public void setPregnancyResult(PregnancyResult pregnancyResult) {
        this.pregnancyResult = pregnancyResult;
    }
}
