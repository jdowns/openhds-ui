package openhds.service;

import openhds.domain.InMigration;
import openhds.domain.Location;
import openhds.domain.LocationRequest;
import openhds.domain.Request;
import org.springframework.stereotype.Service;

@Service
public class InMigrationService extends HttpService {

    @Override
    public String createEntity(Request request) {
        return create("/inMigrations", request, InMigration.class);
    }
}
