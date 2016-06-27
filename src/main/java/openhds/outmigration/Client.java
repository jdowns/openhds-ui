package openhds.outmigration;

import feign.Headers;
import feign.Param;
import feign.QueryMap;
import feign.RequestLine;
import openhds.domain.OpenHdsRestResponse;

import java.util.Map;
import java.util.UUID;

@Headers("Content-Type: application/json")
public interface Client {
    @RequestLine("GET /outMigrations/bulk.json")
    OpenHdsRestResponse<Model> getAll();

    @RequestLine("GET /outMigrations.json")
    /* Valid params are page, size and sort */
    OpenHdsRestResponse<Model> get(@QueryMap Map<String, Object> filterParams);

    @RequestLine("GET /outMigrations/byLocationhierarchy.json")
    /* Valid params are locationHierarchyUuid,afterDate,beforeDate */
    OpenHdsRestResponse<Model> getFilteredByLocationHierarchy(@QueryMap Map<String, Object> filterParams);

    @RequestLine("GET /outMigrations/byLocationhierarchy/bulk.json")
    /* Valid params are locationHierarchyUuid,afterDate,beforeDate */
    OpenHdsRestResponse<Model> getAllFilteredByLocationHierarchy(@QueryMap Map<String, Object> filterParams);

    @RequestLine("GET /outMigrations/voided")
    OpenHdsRestResponse<Model> getVoided();

    @RequestLine("POST /outMigrations")
    Model create(Request request);

    @RequestLine("GET /outMigrations/{id}.json")
    Model get(@Param("id") UUID uuid);

    @RequestLine("DELETE /outMigrations/{id}")
    void delete(@Param("id") UUID uuid);
}
