package openhds.outmigration;

public class OutMIgrationRequest extends openhds.domain.Request {
    OutMigration outMigration;

    public OutMigration getOutMigration() {
        return outMigration;
    }

    public void setOutMigration(OutMigration outMigration) {
        this.outMigration = outMigration;
    }
}
