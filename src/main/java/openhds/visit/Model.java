package openhds.visit;

import openhds.domain.Entity;

public class Model extends Entity {

    private String visitDate;
    private openhds.location.Model location;

    public String getVisitDate() {
        return visitDate;
    }

    public void setVisitDate(String visitDate) {
        this.visitDate = visitDate;
    }

    public openhds.location.Model getLocation() {
        return location;
    }

    public void setLocation(openhds.location.Model location) {
        this.location = location;
    }
}
