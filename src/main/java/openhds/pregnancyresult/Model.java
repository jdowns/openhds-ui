package openhds.pregnancyresult;

import openhds.domain.Response;

public class Model implements Response {
    private String uuid;
    private String type;
    private openhds.pregnancyoutcome.Model pregnancyOutcome;
    private openhds.individual.Model child;

    @Override
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

    public openhds.pregnancyoutcome.Model getPregnancyOutcome() {
        return pregnancyOutcome;
    }

    public void setPregnancyOutcome(openhds.pregnancyoutcome.Model pregnancyOutcome) {
        this.pregnancyOutcome = pregnancyOutcome;
    }

    public openhds.individual.Model getChild() {
        return child;
    }

    public void setChild(openhds.individual.Model child) {
        this.child = child;
    }
}
