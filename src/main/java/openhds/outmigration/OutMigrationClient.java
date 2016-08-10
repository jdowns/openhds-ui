package openhds.outmigration;

import feign.Headers;

@Headers("Content-Type: application/json")
public interface OutMigrationClient extends openhds.RestClient<OutMigration> {

}