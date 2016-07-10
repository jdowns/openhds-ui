package openhds.outmigration;

import openhds.domain.Response;

public class Model  implements openhds.domain.Model  {
    private String uuid;
    private String destination;
    private String reason;
    private String migrationDate;
    private openhds.visit.Model visit;
    private openhds.individual.Model individual;
    private openhds.residency.Model residency;

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public String getOrigin() {
        return destination;
    }

    public void setOrigin(String origin) {
        this.destination = origin;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getMigrationDate() {
        return migrationDate;
    }

    public void setMigrationDate(String migrationDate) {
        this.migrationDate = migrationDate;
    }

    public openhds.visit.Model getVisit() {
        return visit;
    }

    public void setVisit(openhds.visit.Model visit) {
        this.visit = visit;
    }

    public openhds.individual.Model getIndividual() {
        return individual;
    }

    public void setIndividual(openhds.individual.Model individual) {
        this.individual = individual;
    }

    public openhds.residency.Model getResidency() {
        return residency;
    }

    public void setResidency(openhds.residency.Model residency) {
        this.residency = residency;
    }
}
