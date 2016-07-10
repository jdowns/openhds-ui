package openhds.location;

public class LocationRequest extends openhds.domain.Request {
    private Location location;

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }
}
