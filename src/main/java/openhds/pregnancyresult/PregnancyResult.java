package openhds.pregnancyresult;

import openhds.individual.Individual;
import openhds.pregnancyoutcome.PregnancyOutcome;

public class PregnancyResult implements openhds.domain.Model  {
    private String uuid;
    private String type;
    private PregnancyOutcome pregnancyOutcome;
    private Individual child;

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public PregnancyOutcome getPregnancyOutcome() {
        return pregnancyOutcome;
    }

    public void setPregnancyOutcome(PregnancyOutcome pregnancyOutcome) {
        this.pregnancyOutcome = pregnancyOutcome;
    }

    public Individual getChild() {
        return child;
    }

    public void setChild(Individual child) {
        this.child = child;
    }
}
