package openhds.location;

import feign.Headers;
import feign.Param;
import feign.QueryMap;
import feign.RequestLine;
import openhds.domain.OpenHdsRestResponse;

import java.util.Map;
import java.util.UUID;

@Headers("Content-Type: application/json")
public interface Client {
    @RequestLine("GET /locations/bulk.json")
    OpenHdsRestResponse<Model> getAll();

    @RequestLine("GET /locations.json")
    /* Valid params are page, size and sort */
    OpenHdsRestResponse<Model> get(@QueryMap Map<String, Object> filterParams);

    @RequestLine("GET /locations/byLocationhierarchy.json")
    /* Valid params are locationHierarchyUuid,afterDate,beforeDate */
    OpenHdsRestResponse<Model> getFilteredByLocationHierarchy(@QueryMap Map<String, Object> filterParams);

    @RequestLine("GET /locations/byLocationhierarchy/bulk.json")
    /* Valid params are locationHierarchyUuid,afterDate,beforeDate */
    OpenHdsRestResponse<Model> getAllFilteredByLocationHierarchy(@QueryMap Map<String, Object> filterParams);

    @RequestLine("GET /locations/voided")
    OpenHdsRestResponse<Model> getVoided();

    @RequestLine("POST /locations")
    Model create(Request request);

    @RequestLine("GET /locations/{id}.json")
    Model get(@Param("id") UUID uuid);

    @RequestLine("DELETE /locations/{id}")
    void delete(@Param("id") UUID uuid);
}
