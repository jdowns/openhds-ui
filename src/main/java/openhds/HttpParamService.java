package openhds;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class HttpParamService {
    public static Map<String, Object> locationHierarchyFilter(UUID locationHierarchyUuid,
                                                              Date afterDate,
                                                              Date beforeDate) {
        Map<String, Object> filterParams = new HashMap<>();
        if (locationHierarchyUuid != null) filterParams.put("locationHierarchyUuid", locationHierarchyUuid);
        if (afterDate != null) filterParams.put("afterDate", afterDate);
        if (beforeDate != null) filterParams.put("beforeDate", beforeDate);
        return filterParams;
    }
}
