package openhds.event;

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
    @RequestLine("GET /events.json")
    OpenHdsRestResponse<Response> get();

    @RequestLine("GET /events/bulk.json")
    OpenHdsRestResponse<Response> getAll();

    @RequestLine("GET /events.json")
    /* Valid params are page, size and sort */
    OpenHdsRestResponse<Response> getFiltered(@QueryMap Map<String, Object> params);

    @RequestLine("GET /events/byLocationhierarchy.json")
    /* Valid params are locationHierarchyUuid,afterDate,beforeDate */
    OpenHdsRestResponse<Response> getFilteredByLocationHierarchy(@QueryMap Map<String, Object> params);

    @RequestLine("GET /events/byLocationhierarchy/bulk.json")
    /* Valid params are locationHierarchyUuid,afterDate,beforeDate */
    OpenHdsRestResponse<Response> getAllFilteredByLocationHierarchy(@QueryMap Map<String, Object> params);

    @RequestLine("GET /events/voided")
    Response getVoided();

    @RequestLine("POST /events")
    Response create(Request request);

    @RequestLine("GET /events/{id}.json")
    Response get(@Param("id") String uuid);
}
