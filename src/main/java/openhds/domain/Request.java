package openhds.domain;

public class Request {
    public String getCollectedByUuid() {
        return collectedByUuid;
    }

    public void setCollectedByUuid(String collectedByUuid) {
        this.collectedByUuid = collectedByUuid;
    }

    protected String collectedByUuid;
}
