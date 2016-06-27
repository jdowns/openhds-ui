package openhds.locationhierarchy;

public class Request extends openhds.domain.Request {
    private Model locationHierarchy;

    public Model getLocationHierarchy() {
        return locationHierarchy;
    }

    public void setLocationHierarchy(Model locationHierarchy) {
        this.locationHierarchy = locationHierarchy;
    }
}
