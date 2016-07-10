package openhds.location;

import openhds.domain.Model;

public class Location implements Model {

    private final String name;
    private final String type;

    public Location(String name, String type) {
        this.name = name;
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public String getType() {
        return type;
    }
}
