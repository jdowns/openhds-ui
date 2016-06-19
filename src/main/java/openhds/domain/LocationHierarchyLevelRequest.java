package openhds.domain;

public class LocationHierarchyLevelRequest extends Request {
    private LocationHierarchyLevel locationHierarchyLevel;

    public LocationHierarchyLevel getLocationHierarchyLevel() {
        return locationHierarchyLevel;
    }

    public void setLocationHierarchyLevel(LocationHierarchyLevel locationHierarchyLevel) {
        this.locationHierarchyLevel = locationHierarchyLevel;
    }
}
