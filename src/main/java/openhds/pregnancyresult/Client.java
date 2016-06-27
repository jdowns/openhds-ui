package openhds.pregnancyresult;

import feign.Headers;
import feign.Param;
import feign.QueryMap;
import feign.RequestLine;
import openhds.domain.OpenHdsRestResponse;

import java.util.Map;
import java.util.UUID;

@Headers("Content-Type: application/json")
public interface Client {
    @RequestLine("GET /pregnancyResults/bulk.json")
    OpenHdsRestResponse<Model> getAll();

    @RequestLine("GET /pregnancyResults.json")
    /* Valid params are page, size and sort */
    OpenHdsRestResponse<Model> get(@QueryMap Map<String, Object> filterParams);

    @RequestLine("GET /pregnancyResults/byLocationhierarchy.json")
    /* Valid params are locationHierarchyUuid,afterDate,beforeDate */
    OpenHdsRestResponse<Model> getFilteredByLocationHierarchy(@QueryMap Map<String, Object> filterParams);

    @RequestLine("GET /pregnancyResults/byLocationhierarchy/bulk.json")
    /* Valid params are locationHierarchyUuid,afterDate,beforeDate */
    OpenHdsRestResponse<Model> getAllFilteredByLocationHierarchy(@QueryMap Map<String, Object> filterParams);

    @RequestLine("GET /pregnancyResults/voided")
    OpenHdsRestResponse<Model> getVoided();

    @RequestLine("POST /pregnancyResults")
    Model create(Request request);

    @RequestLine("GET /pregnancyResults/{id}.json")
    Model get(@Param("id") UUID uuid);

    @RequestLine("DELETE /pregnancyResults/{id}")
    void delete(@Param("id") UUID uuid);
}
