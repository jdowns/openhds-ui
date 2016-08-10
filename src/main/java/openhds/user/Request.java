package openhds.user;

public class Request extends openhds.domain.Request {
    private User user;

    public User getSocialGroup() {
        return user;
    }

    public void setSocialGroup(User user) {
        this.user = user;
    }
}
