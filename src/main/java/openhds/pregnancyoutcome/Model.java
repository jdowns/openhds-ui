package openhds.pregnancyoutcome;

import openhds.domain.Response;

public class Model implements Response {
    private String uuid;
    private String outcomeDate;
    private openhds.individual.Model mother;

    @Override
    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public String getOutcomeDate() {
        return outcomeDate;
    }

    public void setOutcomeDate(String outcomeDate) {
        this.outcomeDate = outcomeDate;
    }

    public openhds.individual.Model getMother() {
        return mother;
    }

    public void setMother(openhds.individual.Model mother) {
        this.mother = mother;
    }
}
