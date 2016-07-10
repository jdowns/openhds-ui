package openhds;

import openhds.domain.Model;
import openhds.domain.Request;
import org.springframework.http.ResponseEntity;

import java.util.Date;
import java.util.List;
import java.util.UUID;

public interface Controller<MODEL extends Model, REQUEST extends Request> {
    ResponseEntity<MODEL> create(REQUEST request);
    ResponseEntity<List<MODEL>> get(Long page, Long size, Boolean sort);
    ResponseEntity<MODEL>  get(UUID uuid);
    ResponseEntity<List<MODEL>> getAll();
    ResponseEntity<List<MODEL>> getAllFiltered(UUID locationHierarchyUuid, UUID locationUuid, Date afterDate, Date beforeDate);
    ResponseEntity<List<MODEL>> getVoided();
    void delete(UUID uuid);
}
