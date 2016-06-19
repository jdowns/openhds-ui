package openhds.domain;

public class InMigrationRequest extends Request {
    InMigration inMigration;

    public InMigration getInMigration() {
        return inMigration;
    }

    public void setInMigration(InMigration inMigration) {
        this.inMigration = inMigration;
    }
}
