package openhds.membership;

public class Request extends openhds.domain.Request {
    private Model membership;

    public Model getMembership() {
        return membership;
    }

    public void setMembership(Model membership) {
        this.membership = membership;
    }
}
