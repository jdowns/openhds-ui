package openhds.socialgroup;

public class SocialGroupRequest extends openhds.domain.Request {
    private SocialGroup socialGroup;

    public SocialGroup getSocialGroup() {
        return socialGroup;
    }

    public void setSocialGroup(SocialGroup socialGroup) {
        this.socialGroup = socialGroup;
    }
}
