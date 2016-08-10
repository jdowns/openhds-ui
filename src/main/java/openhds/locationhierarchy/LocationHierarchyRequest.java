package openhds.locationhierarchy;

public class LocationHierarchyRequest extends openhds.domain.Request {
    private LocationHierarchy locationHierarchy;

    public LocationHierarchy getLocationHierarchy() {
        return locationHierarchy;
    }

    public void setLocationHierarchy(LocationHierarchy locationHierarchy) {
        this.locationHierarchy = locationHierarchy;
    }
}
