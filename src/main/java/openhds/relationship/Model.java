package openhds.relationship;

import openhds.domain.Response;

public class Model implements openhds.domain.Model  {
    private openhds.individual.Model individualA;
    private openhds.individual.Model individualB;
    private String startDate;
    private String relationshipType;
    private String collectionDateTime;
    private String uuid;

    public openhds.individual.Model getIndividualA() {
        return individualA;
    }

    public void setIndividualA(openhds.individual.Model individualA) {
        this.individualA = individualA;
    }

    public openhds.individual.Model getIndividualB() {
        return individualB;
    }

    public void setIndividualB(openhds.individual.Model individualB) {
        this.individualB = individualB;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getRelationshipType() {
        return relationshipType;
    }

    public void setRelationshipType(String relationshipType) {
        this.relationshipType = relationshipType;
    }

    public String getCollectionDateTime() {
        return collectionDateTime;
    }

    public void setCollectionDateTime(String collectionDateTime) {
        this.collectionDateTime = collectionDateTime;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }
}
