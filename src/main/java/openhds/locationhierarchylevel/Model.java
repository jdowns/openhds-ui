package openhds.locationhierarchylevel;

import openhds.domain.Response;

public class Model implements Response {
    private String uuid;
    private String name;

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
}
