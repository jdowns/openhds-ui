package openhds.relationship;

import feign.Headers;
import feign.Param;
import feign.QueryMap;
import feign.RequestLine;
import openhds.domain.OpenHdsRestResponse;

import java.util.Map;
import java.util.UUID;

@Headers("Content-Type: application/json")
public interface Client {
    @RequestLine("GET /relationships/bulk.json")
    OpenHdsRestResponse<Model> getAll();

    @RequestLine("GET /relationships.json")
    /* Valid params are page, size and sort */
    OpenHdsRestResponse<Model> get(@QueryMap Map<String, Object> filterParams);

    @RequestLine("GET /relationships/byLocationhierarchy.json")
    /* Valid params are locationHierarchyUuid,afterDate,beforeDate */
    OpenHdsRestResponse<Model> getFilteredByLocationHierarchy(@QueryMap Map<String, Object> filterParams);

    @RequestLine("GET /relationships/byLocationhierarchy/bulk.json")
    /* Valid params are locationHierarchyUuid,afterDate,beforeDate */
    OpenHdsRestResponse<Model> getAllFilteredByLocationHierarchy(@QueryMap Map<String, Object> filterParams);

    @RequestLine("GET /relationships/voided")
    OpenHdsRestResponse<Model> getVoided();

    @RequestLine("POST /relationships")
    Model create(Request request);

    @RequestLine("GET /relationships/{id}.json")
    Model get(@Param("id") UUID uuid);

    @RequestLine("DELETE /relationships/{id}")
    void delete(@Param("id") UUID uuid);
}
