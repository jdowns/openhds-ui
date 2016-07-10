package openhds.individual;

import feign.Headers;

@Headers("Content-Type: application/json")
public interface IndividualClient extends openhds.RestClient<Individual> {
}