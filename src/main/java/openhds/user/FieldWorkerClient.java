package openhds.user;

import feign.Headers;

@Headers("Content-Type: application/json")
public interface FieldWorkerClient extends openhds.RestClient<User> {

}