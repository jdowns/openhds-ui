package openhds.inmigration;

public class InMigrationRequest extends openhds.domain.Request {
    InMigration inMigration;

    public InMigration getInMigration() {
        return inMigration;
    }

    public void setInMigration(InMigration inMigration) {
        this.inMigration = inMigration;
    }
}
