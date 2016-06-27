package openhds.pregnancyobservation;

import feign.Headers;
import feign.Param;
import feign.QueryMap;
import feign.RequestLine;
import openhds.domain.OpenHdsRestResponse;

import java.util.Map;
import java.util.UUID;

@Headers("Content-Type: application/json")
public interface Client {
    @RequestLine("GET /pregnancyObservations/bulk.json")
    OpenHdsRestResponse<Model> getAll();

    @RequestLine("GET /pregnancyObservations.json")
    /* Valid params are page, size and sort */
    OpenHdsRestResponse<Model> get(@QueryMap Map<String, Object> filterParams);

    @RequestLine("GET /pregnancyObservations/byLocationhierarchy.json")
    /* Valid params are locationHierarchyUuid,afterDate,beforeDate */
    OpenHdsRestResponse<Model> getFilteredByLocationHierarchy(@QueryMap Map<String, Object> filterParams);

    @RequestLine("GET /pregnancyObservations/byLocationhierarchy/bulk.json")
    /* Valid params are locationHierarchyUuid,afterDate,beforeDate */
    OpenHdsRestResponse<Model> getAllFilteredByLocationHierarchy(@QueryMap Map<String, Object> filterParams);

    @RequestLine("GET /pregnancyObservations/voided")
    OpenHdsRestResponse<Model> getVoided();

    @RequestLine("POST /pregnancyObservations")
    Model create(Request request);

    @RequestLine("GET /pregnancyObservations/{id}.json")
    Model get(@Param("id") UUID uuid);

    @RequestLine("DELETE /pregnancyObservations/{id}")
    void delete(@Param("id") UUID uuid);
}