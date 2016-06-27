package openhds.death;

class Model {
    private String uuid;
    private openhds.visit.Model visit;
    private openhds.individual.Model individual;
    private openhds.location.Model deathPlace;
    private String deathCause;
    private String deathDate;

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
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

    public openhds.location.Model getDeathPlace() {
        return deathPlace;
    }

    public void setDeathPlace(openhds.location.Model deathPlace) {
        this.deathPlace = deathPlace;
    }

    public String getDeathCause() {
        return deathCause;
    }

    public void setDeathCause(String deathCause) {
        this.deathCause = deathCause;
    }

    public String getDeathDate() {
        return deathDate;
    }

    public void setDeathDate(String deathDate) {
        this.deathDate = deathDate;
    }
}
