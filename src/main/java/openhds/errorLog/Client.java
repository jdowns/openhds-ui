package openhds.errorLog;

import feign.Headers;
import feign.Param;
import feign.QueryMap;
import feign.RequestLine;
import openhds.domain.OpenHdsRestResponse;
import openhds.domain.Request;
import openhds.domain.Response;

import java.util.Map;

@Headers("Content-Type: application/json")
public interface Client {
    @RequestLine("GET /errorLogs.json")
    OpenHdsRestResponse<Response> get();

    @RequestLine("GET /errorLogs/bulk.json")
    OpenHdsRestResponse<Response> getAll();

    @RequestLine("GET /errorLogs/byLocationhierarchy.json")
    /* Valid params are locationHierarchyUuid,afterDate,beforeDate */
    OpenHdsRestResponse<Response> getFilteredByLocationHierarchy(@QueryMap Map<String, Object> params);

    @RequestLine("GET /errorLogs/byLocationhierarchy/bulk.json")
    /* Valid params are locationHierarchyUuid,afterDate,beforeDate */
    OpenHdsRestResponse<Response> getAllFilteredByLocationHierarchy(@QueryMap Map<String, Object> params);

    @RequestLine("GET /errorLogs.json")
    /* Valid params are page, size and sort */
    OpenHdsRestResponse<Response> getFiltered(@QueryMap Map<String, Object> params);

    @RequestLine("POST /errorLogs")
    Response create(Request request);

    @RequestLine("GET /errorLogs/voided")
    Response getVoided();

    @RequestLine("GET /errorLogs/{id}.json")
    Response get(@Param("id") String uuid);
}
