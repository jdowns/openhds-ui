package openhds.locationhierarchylevel;

public class LocationHierarchyLevelRequest extends openhds.domain.Request {
    private LocationHierarchyLevel locationHierarchyLevel;

    public LocationHierarchyLevel getLocationHierarchyLevel() {
        return locationHierarchyLevel;
    }

    public void setLocationHierarchyLevel(LocationHierarchyLevel locationHierarchyLevel) {
        this.locationHierarchyLevel = locationHierarchyLevel;
    }
}
