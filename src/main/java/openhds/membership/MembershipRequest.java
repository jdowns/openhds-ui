package openhds.membership;

public class MembershipRequest extends openhds.domain.Request {
    private Membership membership;

    public Membership getMembership() {
        return membership;
    }

    public void setMembership(Membership membership) {
        this.membership = membership;
    }
}
