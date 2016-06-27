package openhds.socialgroup;

import feign.Headers;
import feign.Param;
import feign.QueryMap;
import feign.RequestLine;
import openhds.domain.OpenHdsRestResponse;

import java.util.Map;
import java.util.UUID;

@Headers("Content-Type: application/json")
public interface Client {
    @RequestLine("GET /socialGroups/bulk.json")
    OpenHdsRestResponse<Model> getAll();

    @RequestLine("GET /socialGroups.json")
    /* Valid params are page, size and sort */
    OpenHdsRestResponse<Model> get(@QueryMap Map<String, Object> filterParams);

    @RequestLine("GET /socialGroups/byLocationhierarchy.json")
    /* Valid params are locationHierarchyUuid,afterDate,beforeDate */
    OpenHdsRestResponse<Model> getFilteredByLocationHierarchy(@QueryMap Map<String, Object> filterParams);

    @RequestLine("GET /socialGroups/byLocationhierarchy/bulk.json")
    /* Valid params are locationHierarchyUuid,afterDate,beforeDate */
    OpenHdsRestResponse<Model> getAllFilteredByLocationHierarchy(@QueryMap Map<String, Object> filterParams);

    @RequestLine("GET /socialGroups/voided")
    OpenHdsRestResponse<Model> getVoided();

    @RequestLine("POST /socialGroups")
    Model create(Request request);

    @RequestLine("GET /socialGroups/{id}.json")
    Model get(@Param("id") UUID uuid);

    @RequestLine("DELETE /socialGroups/{id}")
    void delete(@Param("id") UUID uuid);
}