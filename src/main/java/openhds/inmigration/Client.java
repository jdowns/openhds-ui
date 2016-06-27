package openhds.inmigration;

import feign.Headers;
import feign.Param;
import feign.QueryMap;
import feign.RequestLine;
import openhds.domain.OpenHdsRestResponse;

import java.util.Map;
import java.util.UUID;

@Headers("Content-Type: application/json")
public interface Client {
    @RequestLine("GET /inMigrations/bulk.json")
    OpenHdsRestResponse<Model> getAll();

    @RequestLine("GET /inMigrations.json")
    /* Valid params are page, size and sort */
    OpenHdsRestResponse<Model> get(@QueryMap Map<String, Object> filterParams);

    @RequestLine("GET /inMigrations/byLocationhierarchy.json")
    /* Valid params are locationHierarchyUuid,afterDate,beforeDate */
    OpenHdsRestResponse<Model> getFilteredByLocationHierarchy(@QueryMap Map<String, Object> filterParams);

    @RequestLine("GET /inMigrations/byLocationhierarchy/bulk.json")
    /* Valid params are locationHierarchyUuid,afterDate,beforeDate */
    OpenHdsRestResponse<Model> getAllFilteredByLocationHierarchy(@QueryMap Map<String, Object> filterParams);

    @RequestLine("GET /inMigrations/voided")
    OpenHdsRestResponse<Model> getVoided();

    @RequestLine("POST /inMigrations")
    Model create(Request request);

    @RequestLine("GET /inMigrations/{id}.json")
    Model get(@Param("id") UUID uuid);

    @RequestLine("DELETE /inMigrations/{id}")
    void delete(@Param("id") UUID uuid);
}
