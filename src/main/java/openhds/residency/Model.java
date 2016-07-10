package openhds.residency;

import openhds.domain.Response;

public class Model  implements openhds.domain.Model  {
    private openhds.individual.Model individual;
    private openhds.location.Model location;
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

    public openhds.location.Model getLocation() {
        return location;
    }

    public void setLocation(openhds.location.Model location) {
        this.location = location;
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

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }
}
