package openhds.service;

import openhds.domain.LocationHierarchyLevel;
import openhds.domain.Request;
import org.springframework.stereotype.Service;

@Service
public class LocationHierarchyLevelService extends HttpService {

        @Override
        public String createEntity(Request request) {
            return create("/locationHierarchyLevels", request, LocationHierarchyLevel.class);
        }
}
