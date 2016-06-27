package openhds.inmigration;

public class Request extends openhds.domain.Request {
    Model inMigration;

    public Model getInMigration() {
        return inMigration;
    }

    public void setInMigration(Model inMigration) {
        this.inMigration = inMigration;
    }
}
