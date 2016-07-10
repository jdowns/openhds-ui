package openhds.locationhierarchylevel;

import feign.Headers;

@Headers("Content-Type: application/json")
public interface LocationHierarchyLevelClient extends openhds.RestClient<LocationHierarchyLevel> {}