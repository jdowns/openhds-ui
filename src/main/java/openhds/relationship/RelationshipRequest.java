package openhds.relationship;

public class RelationshipRequest extends openhds.domain.Request {
    Relationship relationship;

    public Relationship getRelationship() {
        return relationship;
    }

    public void setRelationship(Relationship relationship) {
        this.relationship = relationship;
    }
}
