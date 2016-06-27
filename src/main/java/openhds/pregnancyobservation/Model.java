package openhds.pregnancyobservation;

import openhds.domain.Response;

public class Model implements Response {
    private String uuid;
    private openhds.visit.Model visit;
    private String expectedDeliveryDate;
    private String pregnancyDate;
    private openhds.individual.Model mother;

    @Override
    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public openhds.visit.Model getVisit() {
        return visit;
    }

    public void setVisit(openhds.visit.Model visit) {
        this.visit = visit;
    }

    public String getExpectedDeliveryDate() {
        return expectedDeliveryDate;
    }

    public void setExpectedDeliveryDate(String expectedDeliveryDate) {
        this.expectedDeliveryDate = expectedDeliveryDate;
    }

    public String getPregnancyDate() {
        return pregnancyDate;
    }

    public void setPregnancyDate(String pregnancyDate) {
        this.pregnancyDate = pregnancyDate;
    }

    public openhds.individual.Model getMother() {
        return mother;
    }

    public void setMother(openhds.individual.Model mother) {
        this.mother = mother;
    }
}
