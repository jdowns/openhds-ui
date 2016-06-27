package openhds.user;

public class Privilege {

    public enum Grant {
        ROLE_USER,
        ROLE_CREATE_ENTITY,
        ROLE_VIEW_ENTITY,
        ROLE_EDIT_ENTITY,
        ROLE_DELETE_ENTITY,
        ROLE_CREATE_USER,
        ROLE_DELETE_USER
    }

    public Privilege() {
    }

    public Privilege(Grant grant) {
        setGrant(grant);
    }

    private Grant grant;

    public Grant getGrant() {
        return grant;
    }

    public void setGrant(Grant grant) {
        this.grant = grant;
    }

    @Override
    public int hashCode() {
        if (null == grant) {
            return 0;
        }
        return grant.hashCode();
    }

    @Override
    public boolean equals(Object other) {

        if (other == null) {
            return false;
        }

        if (getClass() != other.getClass()) {
            return false;
        }

        final Grant otherGrant = ((Privilege) other).getGrant();
        return null != grant && null != otherGrant && grant.equals(otherGrant);
    }

    @Override
    public String toString() {
        return grant.toString();
    }
}