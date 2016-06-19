package openhds.domain;

public class OutMigrationRequest extends Request {
    OutMigration outMigration;

    public OutMigration getOutMigration() {
        return outMigration;
    }

    public void setOutMigration(OutMigration outMigration) {
        this.outMigration = outMigration;
    }
}
