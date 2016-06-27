package openhds.individual;

import feign.Headers;
import feign.Param;
import feign.QueryMap;
import feign.RequestLine;
import openhds.domain.OpenHdsRestResponse;

import java.util.Map;
import java.util.UUID;

@Headers("Content-Type: application/json")
public interface Client {

    @RequestLine("GET /individuals/bulk.json")
    OpenHdsRestResponse<Model> getAll();

    @RequestLine("GET /individuals.json")
    /* Valid params are page, size and sort */
    OpenHdsRestResponse<Model> get(@QueryMap Map<String, Object> filterParams);

    @RequestLine("GET /individuals/byLocationhierarchy.json")
    /* Valid params are locationHierarchyUuid,afterDate,beforeDate */
    OpenHdsRestResponse<Model> getFilteredByLocationHierarchy(@QueryMap Map<String, Object> filterParams);

    @RequestLine("GET /individuals/byLocationhierarchy/bulk.json")
    /* Valid params are locationHierarchyUuid,afterDate,beforeDate */
    OpenHdsRestResponse<Model> getAllFilteredByLocationHierarchy(@QueryMap Map<String, Object> filterParams);

    @RequestLine("GET /individuals/voided")
    OpenHdsRestResponse<Model> getVoided();

    @RequestLine("POST /individuals")
    Model create(Request request);

    @RequestLine("GET /individuals/{id}.json")
    Model get(@Param("id") UUID uuid);

    @RequestLine("DELETE /individuals/{id}")
    void delete(@Param("id") UUID uuid);
}
