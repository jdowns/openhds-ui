package openhds.projectcode;

import feign.Headers;
import feign.Param;
import feign.QueryMap;
import feign.RequestLine;
import openhds.domain.OpenHdsRestResponse;

import java.util.Map;
import java.util.UUID;

@Headers("Content-Type: application/json")
public interface Client {
    @RequestLine("GET /projectCodes/bulk.json")
    OpenHdsRestResponse<Model> getAll();

    @RequestLine("GET /projectCodes.json")
    /* Valid params are page, size and sort */
    OpenHdsRestResponse<Model> get(@QueryMap Map<String, Object> filterParams);

    @RequestLine("GET /projectCodes/byLocationhierarchy.json")
    /* Valid params are locationHierarchyUuid,afterDate,beforeDate */
    OpenHdsRestResponse<Model> getFilteredByLocationHierarchy(@QueryMap Map<String, Object> filterParams);

    @RequestLine("GET /projectCodes/byLocationhierarchy/bulk.json")
    /* Valid params are locationHierarchyUuid,afterDate,beforeDate */
    OpenHdsRestResponse<Model> getAllFilteredByLocationHierarchy(@QueryMap Map<String, Object> filterParams);

    @RequestLine("GET /projectCodes/voided")
    OpenHdsRestResponse<Model> getVoided();

    @RequestLine("POST /projectCodes")
    Model create(Request request);

    @RequestLine("GET /projectCodes/{id}.json")
    Model get(@Param("id") UUID uuid);

    @RequestLine("DELETE /projectCodes/{id}")
    void delete(@Param("id") UUID uuid);
}