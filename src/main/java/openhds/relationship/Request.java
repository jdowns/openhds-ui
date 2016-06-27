package openhds.relationship;

public class Request extends openhds.domain.Request {
    Model relationship;

    public Model getRelationship() {
        return relationship;
    }

    public void setRelationship(Model relationship) {
        this.relationship = relationship;
    }
}
