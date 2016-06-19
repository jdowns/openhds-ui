package openhds.domain;

public class DeathRequest extends Request {
    Death death;

    public Death getDeath() {
        return death;
    }

    public void setDeath(Death death) {
        this.death = death;
    }
}
