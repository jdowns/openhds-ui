package openhds.residency;

import feign.Headers;

@Headers("Content-Type: application/json")
public interface ResidencyClient extends openhds.RestClient<Residency> {

}