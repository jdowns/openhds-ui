package openhds.visit;

import feign.Headers;

@Headers("Content-Type: application/json")
public interface VisitClient extends openhds.RestClient<Visit> {

}