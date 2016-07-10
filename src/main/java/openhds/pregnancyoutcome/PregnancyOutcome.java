package openhds.pregnancyoutcome;

import openhds.individual.Individual;

public class PregnancyOutcome implements openhds.domain.Model  {
    private String uuid;
    private String outcomeDate;
    private Individual mother;

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

    public Individual getMother() {
        return mother;
    }

    public void setMother(Individual mother) {
        this.mother = mother;
    }
}
