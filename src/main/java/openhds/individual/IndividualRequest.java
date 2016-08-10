package openhds.individual;

public class IndividualRequest extends openhds.domain.Request {
    private Individual individual;

    public Individual getIndividual() {
        return individual;
    }

    public void setIndividual(Individual individual) {
        this.individual = individual;
    }
}
