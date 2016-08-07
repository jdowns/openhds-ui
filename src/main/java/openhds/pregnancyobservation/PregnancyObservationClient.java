package openhds.pregnancyobservation;
import feign.Headers;

@Headers("Content-Type: application/json")
public interface PregnancyObservationClient extends openhds.RestClient<PregnancyObservation> {

}