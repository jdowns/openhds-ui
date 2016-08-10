package openhds.pregnancyresult;

public class PregnancyResultRequest extends openhds.domain.Request {
    private PregnancyResult pregnancyResult;

    public PregnancyResult getPregnancyResult() {
        return pregnancyResult;
    }

    public void setPregnancyResult(PregnancyResult pregnancyResult) {
        this.pregnancyResult = pregnancyResult;
    }
}
