package openhds.residency;

import feign.Headers;
import feign.Param;
import feign.QueryMap;
import feign.RequestLine;
import openhds.domain.OpenHdsRestResponse;

import java.util.Map;
import java.util.UUID;

@Headers("Content-Type: application/json")
public interface Client {
    @RequestLine("GET /residencies/bulk.json")
    OpenHdsRestResponse<Model> getAll();

    @RequestLine("GET /residencies.json")
    /* Valid params are page, size and sort */
    OpenHdsRestResponse<Model> get(@QueryMap Map<String, Object> filterParams);

    @RequestLine("GET /residencies/byLocationhierarchy.json")
    /* Valid params are locationHierarchyUuid,afterDate,beforeDate */
    OpenHdsRestResponse<Model> getFilteredByLocationHierarchy(@QueryMap Map<String, Object> filterParams);

    @RequestLine("GET /residencies/byLocationhierarchy/bulk.json")
    /* Valid params are locationHierarchyUuid,afterDate,beforeDate */
    OpenHdsRestResponse<Model> getAllFilteredByLocationHierarchy(@QueryMap Map<String, Object> filterParams);

    @RequestLine("GET /residencies/voided")
    OpenHdsRestResponse<Model> getVoided();

    @RequestLine("POST /residencies")
    Model create(Request request);

    @RequestLine("GET /residencies/{id}.json")
    Model get(@Param("id") UUID uuid);

    @RequestLine("DELETE /residencies/{id}")
    void delete(@Param("id") UUID uuid);
}