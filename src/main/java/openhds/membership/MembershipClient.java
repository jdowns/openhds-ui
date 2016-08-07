package openhds.membership;

import feign.Headers;

@Headers("Content-Type: application/json")
public interface MembershipClient extends openhds.RestClient<Membership> {

}