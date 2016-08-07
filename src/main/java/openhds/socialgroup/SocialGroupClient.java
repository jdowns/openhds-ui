package openhds.socialgroup;

import feign.Headers;

@Headers("Content-Type: application/json")
public interface SocialGroupClient extends openhds.RestClient<SocialGroup> {

}