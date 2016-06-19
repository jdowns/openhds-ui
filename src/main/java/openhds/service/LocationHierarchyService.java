package openhds.service;

import openhds.domain.LocationHierarchy;
import openhds.domain.Request;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class LocationHierarchyService extends HttpService {

    @Override
    public String createEntity(Request request) {
        return create("/locationHierarchies", request, LocationHierarchy.class);
    }

    public List<LocationHierarchy> getAll() {
        final ResponseEntity<LocationHierarchy[]> responseEntity = get("/locationHierarchies/bulk", LocationHierarchy[].class);
        return Arrays.asList(responseEntity.getBody());
    }
}
