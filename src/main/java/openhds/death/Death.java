package openhds.death;

import openhds.individual.Individual;
import openhds.location.Location;
import openhds.visit.Visit;

public class Death implements openhds.domain.Model {
    private final String uuid;
    private final Visit visit;
    private final Individual individual;
    private final Location deathPlace;
    private final String deathCause;
    private final String deathDate;

    public Death(String uuid, Visit visit, Individual individual, Location deathPlace, String deathCause, String deathDate) {
        this.uuid = uuid;
        this.visit = visit;
        this.individual = individual;
        this.deathPlace = deathPlace;
        this.deathCause = deathCause;
        this.deathDate = deathDate;
    }
    public String getUuid() {
        return uuid;
    }

    public Visit getVisit() {
        return visit;
    }

    public Individual getIndividual() {
        return individual;
    }

    public Location getDeathPlace() {
        return deathPlace;
    }

    public String getDeathCause() {
        return deathCause;
    }

    public String getDeathDate() {
        return deathDate;
    }

}
