package openhds.locationhierarchy;

import openhds.locationhierarchylevel.LocationHierarchyLevel;

public class LocationHierarchy implements openhds.domain.Model  {
    private String uuid;
    private String name;
    private String extId;
    private LocationHierarchyLevel level;

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getExtId() {
        return extId;
    }

    public void setExtId(String extId) {
        this.extId = extId;
    }

    public LocationHierarchyLevel getLevel() {
        return level;
    }

    public void setLevel(LocationHierarchyLevel level) {
        this.level = level;
    }
}
