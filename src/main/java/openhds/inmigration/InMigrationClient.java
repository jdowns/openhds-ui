package openhds.inmigration;

import feign.Headers;

@Headers("Content-Type: application/json")
public interface InMigrationClient extends openhds.RestClient<InMigration> {

}