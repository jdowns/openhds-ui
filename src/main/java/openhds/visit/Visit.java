package openhds.visit;


import openhds.location.Location;

public class Visit implements openhds.domain.Model  {

    private String visitDate;
    private Location location;

    public String getVisitDate() {
        return visitDate;
    }

    public void setVisitDate(String visitDate) {
        this.visitDate = visitDate;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }
}
