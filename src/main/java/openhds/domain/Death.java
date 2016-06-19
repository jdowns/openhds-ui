package openhds.domain;

public class Death implements Response {
    private String uuid;
    private Visit visit;
    private Individual individual;
    private Location deathPlace;
    private String deathCause;
    private String deathDate;

    @Override
    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public Visit getVisit() {
        return visit;
    }

    public void setVisit(Visit visit) {
        this.visit = visit;
    }

    public Individual getIndividual() {
        return individual;
    }

    public void setIndividual(Individual individual) {
        this.individual = individual;
    }

    public Location getDeathPlace() {
        return deathPlace;
    }

    public void setDeathPlace(Location deathPlace) {
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
