package openhds.death;

public class Request extends openhds.domain.Request {
    private Model death;

    public Model getDeath() {
        return death;
    }

    public void setDeath(Model death) {
        this.death = death;
    }
}
