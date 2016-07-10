package openhds.death;

import openhds.domain.Request;

public class DeathRequest extends Request {
    private Death death;

    public Death getDeath() {
        return death;
    }

    public void setDeath(Death death) {
        this.death = death;
    }
}
