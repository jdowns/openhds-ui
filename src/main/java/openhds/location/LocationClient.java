package openhds.location;

import feign.Headers;

@Headers("Content-Type: application/json")
public interface LocationClient extends openhds.RestClient<Location> {

}