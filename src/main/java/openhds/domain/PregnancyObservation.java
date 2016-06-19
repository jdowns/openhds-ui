package openhds.domain;

public class PregnancyObservation implements Response {
    private String uuid;
    private Visit visit;
    private String expectedDeliveryDate;
    private String pregnancyDate;
    private Individual mother;

    @Override
    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public Visit getVisit() {
        return visit;
    }

    public void setVisit(Visit visit) {
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

    public Individual getMother() {
        return mother;
    }

    public void setMother(Individual mother) {
        this.mother = mother;
    }
}
