package openhds.locationhierarchy;

import feign.Headers;

@Headers("Content-Type: application/json")
public interface LocationHierarchyClient extends openhds.RestClient<LocationHierarchy> {}