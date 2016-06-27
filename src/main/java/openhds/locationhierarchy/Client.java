package openhds.locationhierarchy;

import feign.Headers;
import feign.Param;
import feign.QueryMap;
import feign.RequestLine;
import openhds.domain.OpenHdsRestResponse;

import java.util.Map;
import java.util.UUID;

@Headers("Content-Type: application/json")
public interface Client {
    @RequestLine("GET /locationHierarchies/bulk.json")
    OpenHdsRestResponse<Model> getAll();

    @RequestLine("GET /locationHierarchies.json")
    /* Valid params are page, size and sort */
    OpenHdsRestResponse<Model> get(@QueryMap Map<String, Object> filterParams);

    @RequestLine("GET /locationHierarchies/byLocationhierarchy.json")
    /* Valid params are locationHierarchyUuid,afterDate,beforeDate */
    OpenHdsRestResponse<Model> getFilteredByLocationHierarchy(@QueryMap Map<String, Object> filterParams);

    @RequestLine("GET /locationHierarchies/byLocationhierarchy/bulk.json")
    /* Valid params are locationHierarchyUuid,afterDate,beforeDate */
    OpenHdsRestResponse<Model> getAllFilteredByLocationHierarchy(@QueryMap Map<String, Object> filterParams);

    @RequestLine("GET /locationHierarchies/voided")
    OpenHdsRestResponse<Model> getVoided();

    @RequestLine("POST /locationHierarchies")
    Model create(Request request);

    @RequestLine("GET /locationHierarchies/{id}.json")
    Model get(@Param("id") UUID uuid);

    @RequestLine("DELETE /locationHierarchies/{id}")
    void delete(@Param("id") UUID uuid);
}
