package openhds.individual;

public class Request extends openhds.domain.Request {
    private Model individual;

    public Model getIndividual() {
        return individual;
    }

    public void setIndividual(Model individual) {
        this.individual = individual;
    }
}
