package openhds.membership;

import openhds.domain.Response;

public class Model implements Response {
    private openhds.individual.Model individual;
    private openhds.socialgroup.Model socialGroup;
    private String startDate;
    private String startType;
    private String collectionDateTime;
    private String uuid;

    public openhds.individual.Model getIndividual() {
        return individual;
    }

    public void setIndividual(openhds.individual.Model individual) {
        this.individual = individual;
    }

    public openhds.socialgroup.Model getSocialGroup() {
        return socialGroup;
    }

    public void setSocialGroup(openhds.socialgroup.Model socialGroup) {
        this.socialGroup = socialGroup;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getStartType() {
        return startType;
    }

    public void setStartType(String startType) {
        this.startType = startType;
    }

    public String getCollectionDateTime() {
        return collectionDateTime;
    }

    public void setCollectionDateTime(String collectionDateTime) {
        this.collectionDateTime = collectionDateTime;
    }
    public void setUuid(String uuid) {
        this.uuid = uuid;
    }
    public String getUuid() {
        return uuid;
    }
}
