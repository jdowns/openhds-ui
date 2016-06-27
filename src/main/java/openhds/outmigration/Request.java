package openhds.outmigration;

public class Request extends openhds.domain.Request {
    Model outMigration;

    public Model getOutMigration() {
        return outMigration;
    }

    public void setOutMigration(Model outMigration) {
        this.outMigration = outMigration;
    }
}
