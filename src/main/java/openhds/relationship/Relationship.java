package openhds.relationship;

import openhds.individual.Individual;

public class Relationship implements openhds.domain.Model  {
    private Individual individualA;
    private Individual individualB;
    private String startDate;
    private String relationshipType;
    private String collectionDateTime;
    private String uuid;

    public Individual getIndividualA() {
        return individualA;
    }

    public void setIndividualA(Individual individualA) {
        this.individualA = individualA;
    }

    public Individual getIndividualB() {
        return individualB;
    }

    public void setIndividualB(Individual individualB) {
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
