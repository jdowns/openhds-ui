package openhds.membership;

import feign.Headers;
import feign.Param;
import feign.QueryMap;
import feign.RequestLine;
import openhds.domain.OpenHdsRestResponse;

import java.util.Map;
import java.util.UUID;

@Headers("Content-Type: application/json")
public interface Client {
    @RequestLine("GET /memberships/bulk.json")
    OpenHdsRestResponse<Model> getAll();

    @RequestLine("GET /memberships.json")
    /* Valid params are page, size and sort */
    OpenHdsRestResponse<Model> get(@QueryMap Map<String, Object> filterParams);

    @RequestLine("GET /memberships/byLocationhierarchy.json")
    /* Valid params are locationHierarchyUuid,afterDate,beforeDate */
    OpenHdsRestResponse<Model> getFilteredByLocationHierarchy(@QueryMap Map<String, Object> filterParams);

    @RequestLine("GET /memberships/byLocationhierarchy/bulk.json")
    /* Valid params are locationHierarchyUuid,afterDate,beforeDate */
    OpenHdsRestResponse<Model> getAllFilteredByLocationHierarchy(@QueryMap Map<String, Object> filterParams);

    @RequestLine("GET /memberships/voided")
    OpenHdsRestResponse<Model> getVoided();

    @RequestLine("POST /memberships")
    Model create(Request request);

    @RequestLine("GET /memberships/{id}.json")
    Model get(@Param("id") UUID uuid);

    @RequestLine("DELETE /memberships/{id}")
    void delete(@Param("id") UUID uuid);
}