package openhds.service;

import openhds.domain.ProjectCode;
import openhds.domain.Request;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@Service
public class ProjectCodeService extends HttpService {
    @Override
    public String createEntity(Request request) {
        return create("/projectCodes", request, ProjectCode.class);
    }

    public List<ProjectCode> getByGroup(String group) {
        ResponseEntity<ProjectCode[]> projectCodesResponse = get("/projectCodes/bulk", ProjectCode[].class);
        return Arrays.asList(projectCodesResponse.getBody()).stream()
                .filter(g -> Objects.equals(group, g.getCodeGroup()))
                .collect(Collectors.toList());
    }
}
