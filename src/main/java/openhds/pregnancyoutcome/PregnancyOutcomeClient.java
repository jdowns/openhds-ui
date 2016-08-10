package openhds.pregnancyoutcome;


import feign.Headers;

@Headers("Content-Type: application/json")
public interface PregnancyOutcomeClient extends openhds.RestClient<PregnancyOutcome> {

}