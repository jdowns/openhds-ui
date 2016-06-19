package openhds.service;

import openhds.domain.*;
import org.springframework.stereotype.Service;

@Service
public class OutMigrationService extends HttpService {

    @Override
    public String createEntity(Request request) {
        return create("/outMigrations", request, OutMigration.class);
    }
}
