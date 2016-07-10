package openhds;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.restassured.http.ContentType;
import openhds.location.Location;
import openhds.location.LocationClient;
import openhds.location.LocationRequest;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.UUID;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;
import static org.mockito.Mockito.when;

public class LocationTest extends FunctionalTestBase {
    @Autowired
    LocationClient locationClient;

    @Autowired
    protected ObjectMapper objectMapper;

    final static String baseUrl = "/api/location/";

    @Test
    public void createLocationTest() throws Exception {

        String uuid = UUID.randomUUID().toString();
        Location location = new Location("test-location", "test-type", null);
        LocationRequest request = new LocationRequest(location, uuid);
        Location expected = new Location("test-location", "test-type", uuid);

        when(locationClient.create(request)).thenReturn(expected);

        String requestString = objectMapper.writeValueAsString(request);
        String expectedString = objectMapper.writeValueAsString(expected);
        given()
                .body(requestString).
        when()
                .contentType(ContentType.JSON)
                .post(baseUrl).
        then()
               .statusCode(201)
               .body(equalTo(expectedString));
    }
}
