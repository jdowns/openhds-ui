package openhds.service;

import openhds.domain.LocationHierarchy;
import openhds.domain.Request;
import org.springframework.stereotype.Service;

@Service
public class LocationHierarchyService extends HttpService {

        @Override
        public String createEntity(Request request) {
            return create("/locationHierarchies", request, LocationHierarchy.class);
        }
}
