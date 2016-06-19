package openhds.domain;

public class LocationHierarchyRequest extends Request {
    private LocationHierarchy locationHierarchy;

    public LocationHierarchy getLocationHierarchy() {
        return locationHierarchy;
    }

    public void setLocationHierarchy(LocationHierarchy locationHierarchy) {
        this.locationHierarchy = locationHierarchy;
    }
}
