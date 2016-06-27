package openhds.locationhierarchy;

import openhds.domain.Response;

public class Model implements Response {
    private String uuid;
    private String name;
    private String extId;
    private openhds.locationhierarchylevel.Model level;

    @Override
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

    public openhds.locationhierarchylevel.Model getLevel() {
        return level;
    }

    public void setLevel(openhds.locationhierarchylevel.Model level) {
        this.level = level;
    }
}
