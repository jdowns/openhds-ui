package openhds;

import feign.Param;
import feign.QueryMap;
import feign.RequestLine;
import openhds.domain.Model;
import openhds.domain.OpenHdsRestResponse;
import openhds.domain.Request;

import java.util.Map;
import java.util.UUID;

public interface RestClient<MODEL extends Model> extends openhds.domain.Client {
    @RequestLine("GET /")
    OpenHdsRestResponse<MODEL> get(@QueryMap Map<String, Object> params);

    @RequestLine("GET /{id}")
    MODEL get(@Param("id") UUID uuid);

    @RequestLine("GET /bulk")
    OpenHdsRestResponse<MODEL> getAll();

    @RequestLine("GET /")
    /* Valid params are page, size and sort */
    OpenHdsRestResponse<MODEL> getFiltered(@QueryMap Map<String, Object> params);

    @RequestLine("GET /byLocationhierarchy")
    /* Valid params are locationHierarchyUuid,afterDate,beforeDate */
    OpenHdsRestResponse<MODEL> getFilteredByLocationHierarchy(@QueryMap Map<String, Object> params);

    @RequestLine("GET /byLocationhierarchy/bulk")
    /* Valid params are locationHierarchyUuid,afterDate,beforeDate */
    OpenHdsRestResponse<MODEL> getAllFilteredByLocationHierarchy(@QueryMap Map<String, Object> params);

    @RequestLine("GET /voided")
    OpenHdsRestResponse<MODEL> getVoided();

    @RequestLine("POST /")
    MODEL create(Request request);

    @RequestLine("DELETE /{id}")
    MODEL delete(@Param("id") UUID uuid);
}
