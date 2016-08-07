package openhds.event;

import feign.Headers;

@Headers("Content-Type: application/json")
public interface EventClient extends openhds.RestClient<Event> {

}