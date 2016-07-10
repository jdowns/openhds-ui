package openhds.errorLog;

import feign.Headers;

@Headers("Content-Type: application/json")
public interface ErrorLogClient extends openhds.RestClient<ErrorLog> {

}
