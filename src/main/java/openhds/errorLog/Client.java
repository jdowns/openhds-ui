package openhds.errorLog;

import feign.Headers;
import feign.Param;
import feign.QueryMap;
import feign.RequestLine;
import openhds.domain.*;

import java.util.Map;

@Headers("Content-Type: application/json")
public interface Client extends openhds.RestClient<Model> {

}
