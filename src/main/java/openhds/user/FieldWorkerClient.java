package openhds.user;

import feign.Headers;
import feign.Param;
import feign.QueryMap;
import feign.RequestLine;
import openhds.domain.OpenHdsRestResponse;
import openhds.domain.Request;
import openhds.domain.Response;

import java.util.Map;

@Headers("Content-Type: application/json")
public interface FieldWorkerClient {
    @RequestLine("GET /fieldWorkers.json")
    OpenHdsRestResponse<Response> get();

    @RequestLine("GET /fieldWorkers/bulk.json")
    OpenHdsRestResponse<Response> getAll();

    @RequestLine("GET /fieldWorkers.json")
    /* Valid params are page, size and sort */
    OpenHdsRestResponse<Response> getFiltered(@QueryMap Map<String, Object> params);

    @RequestLine("GET /fieldWorkers/byLocationhierarchy.json")
    /* Valid params are locationHierarchyUuid,afterDate,beforeDate */
    OpenHdsRestResponse<Response> getFilteredByLocationHierarchy(@QueryMap Map<String, Object> params);

    @RequestLine("GET /fieldWorkers/byLocationhierarchy/bulk.json")
    /* Valid params are locationHierarchyUuid,afterDate,beforeDate */
    OpenHdsRestResponse<Response> getAllFilteredByLocationHierarchy(@QueryMap Map<String, Object> params);

    @RequestLine("GET /fieldWorkers/voided")
    Response getVoided();

    @RequestLine("POST /fieldWorkers")
    Response create(Request request);

    @RequestLine("GET /fieldWorkers/{id}.json")
    Response get(@Param("id") String uuid);
}
