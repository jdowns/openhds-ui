package openhds.user;

import feign.Headers;

@Headers("Content-Type: application/json")
public interface UserClient extends openhds.RestClient<User> {

}
