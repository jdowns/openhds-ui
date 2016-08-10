package openhds.membership;

import openhds.individual.Individual;
import openhds.socialgroup.SocialGroup;

public class Membership implements openhds.domain.Model  {
    private Individual individual;
    private SocialGroup socialGroup;
    private String startDate;
    private String startType;
    private String collectionDateTime;
    private String uuid;

    public Individual getIndividual() {
        return individual;
    }

    public void setIndividual(Individual individual) {
        this.individual = individual;
    }

    public SocialGroup getSocialGroup() {
        return socialGroup;
    }

    public void setSocialGroup(SocialGroup socialGroup) {
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
