package openhds.pregnancyresult;

import feign.Headers;

@Headers("Content-Type: application/json")
public interface PregnancyResultClient extends openhds.RestClient<PregnancyResult> {

}