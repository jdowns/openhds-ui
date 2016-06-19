package openhds.service;

import openhds.domain.*;
import org.springframework.stereotype.Service;

@Service
public class DeathService extends HttpService {

    @Override
    public String createEntity(Request request) {
        return create("/deaths", request, Death.class);
    }
}
