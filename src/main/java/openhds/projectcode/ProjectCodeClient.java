package openhds.projectcode;

import feign.Headers;

@Headers("Content-Type: application/json")
public interface ProjectCodeClient extends openhds.RestClient<ProjectCode> {

}