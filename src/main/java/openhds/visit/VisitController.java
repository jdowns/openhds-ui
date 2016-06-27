package openhds.visit;

import com.google.common.collect.ImmutableMap;
import openhds.HttpParamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping(value="/visit")
public class VisitController implements openhds.Controller<Model, Request> {

    @Autowired Client client;

    @Override
    @RequestMapping(value="/", method=RequestMethod.POST)
    public ResponseEntity<Model> create(@RequestBody Request request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(client.create(request));
    }

    @Override
    @RequestMapping(value="/", method=RequestMethod.GET)
    public ResponseEntity<List<Model>> get(@RequestParam(name = "page", defaultValue = "1L") Long page,
                                           @RequestParam(name = "size", defaultValue = "20L") Long size,
                                           @RequestParam(name = "sort", defaultValue = "true") Boolean sort) {
        Map<String, Object> filterParams = ImmutableMap.of("page", page, "size", size, "sort", sort);
        return ResponseEntity.status(HttpStatus.OK).body(client.get(filterParams).getContent());
    }

    @Override
    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public ResponseEntity<List<Model>> getAll() {
        return ResponseEntity.status(HttpStatus.OK).body(client.getAll().getContent());
    }

    @Override
    @RequestMapping(value="/{uuid}", method=RequestMethod.GET)
    public ResponseEntity<Model> get(@PathVariable(value="uuid") UUID uuid) {
        return ResponseEntity.status(HttpStatus.OK).body(client.get(uuid));
    }

    @Override
    @RequestMapping(value = "/byLocation", method = RequestMethod.GET)
    public ResponseEntity<List<Model>> getAllFiltered(
            @RequestParam(name = "locationHierarchyUuid", required = false) UUID locationHierarchyUuid,
            @RequestParam(name = "locationUuid", required = false) UUID locationUuid, // note: unused
            @RequestParam(name = "afterDate", required = false) Date afterDate,
            @RequestParam(name = "beforeDate", required = false) Date beforeDate) {
        Map<String, Object> filterParams = HttpParamService.locationHierarchyFilter(locationHierarchyUuid, afterDate, beforeDate);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(client.getFilteredByLocationHierarchy(filterParams).getContent());
    }

    @Override
    @RequestMapping(value = "/voided", method = RequestMethod.GET)
    public ResponseEntity<List<Model>> getVoided() {
        return ResponseEntity.status(HttpStatus.OK).body(client.getVoided().getContent());
    }

    @Override
    @RequestMapping(value = "/", method = RequestMethod.DELETE)
    public void delete(UUID uuid) {
        client.delete(uuid);
    }
}
