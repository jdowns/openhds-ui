package openhds.locationhierarchylevel;

import feign.Headers;

@Headers("Content-Type: application/json")
public interface Client extends openhds.RestClient<Model> {

}