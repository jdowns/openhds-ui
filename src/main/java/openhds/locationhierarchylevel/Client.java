package openhds.locationhierarchylevel;

import feign.Headers;
import feign.Param;
import feign.QueryMap;
import feign.RequestLine;
import openhds.domain.OpenHdsRestResponse;

import java.util.Map;
import java.util.UUID;

@Headers("Content-Type: application/json")
public interface Client {
    @RequestLine("GET /locationHierarchyLevels/bulk.json")
    OpenHdsRestResponse<Model> getAll();

    @RequestLine("GET /locationHierarchyLevels.json")
    /* Valid params are page, size and sort */
    OpenHdsRestResponse<Model> get(@QueryMap Map<String, Object> filterParams);

    @RequestLine("GET /locationHierarchyLevels/byLocationhierarchy.json")
    /* Valid params are locationHierarchyUuid,afterDate,beforeDate */
    OpenHdsRestResponse<Model> getFilteredByLocationHierarchy(@QueryMap Map<String, Object> filterParams);

    @RequestLine("GET /locationHierarchyLevels/byLocationhierarchy/bulk.json")
    /* Valid params are locationHierarchyUuid,afterDate,beforeDate */
    OpenHdsRestResponse<Model> getAllFilteredByLocationHierarchy(@QueryMap Map<String, Object> filterParams);

    @RequestLine("GET /locationHierarchyLevels/voided")
    OpenHdsRestResponse<Model> getVoided();

    @RequestLine("POST /locationHierarchyLevels")
    Model create(Request request);

    @RequestLine("GET /locationHierarchyLevels/{id}.json")
    Model get(@Param("id") UUID uuid);

    @RequestLine("DELETE /locationHierarchyLevels/{id}")
    void delete(@Param("id") UUID uuid);
}
