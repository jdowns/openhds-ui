package openhds.location;

public class Request extends openhds.domain.Request {
    private Model location;

    public Model getLocation() {
        return location;
    }

    public void setLocation(Model location) {
        this.location = location;
    }
}
