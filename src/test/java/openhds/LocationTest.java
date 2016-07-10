package openhds;

import io.restassured.http.ContentType;
import openhds.domain.OpenHdsRestResponse;
import openhds.location.Location;
import openhds.location.LocationClient;
import openhds.location.LocationRequest;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;
import static org.mockito.Matchers.anyMap;
import static org.mockito.Mockito.when;

public class LocationTest extends FunctionalTestBase {
    @Autowired
    LocationClient locationClient;

    private final static String baseUrl = "/api/location/";

    @Test
    public void createLocationTest() throws Exception {
        final LocationRequest locationRequest = RandomEntityFactory.createLocationRequest();
        final Location locationResponse = RandomEntityFactory.createLocationResponse(locationRequest);

        when(locationClient.create(locationRequest)).thenReturn(locationResponse);

        String requestString = objectMapper.writeValueAsString(locationRequest);
        String expectedString = objectMapper.writeValueAsString(locationResponse);
        given()
                .body(requestString).
        when()
                .contentType(ContentType.JSON)
                .post(baseUrl).
        then()
               .statusCode(201)
               .body(equalTo(expectedString));
    }

    @Test
    public void getSingleLocationTest() throws Exception {
        Location expected = RandomEntityFactory.createLocationResponse();
        String uuid = expected.getUuid();
        String expectedString = objectMapper.writeValueAsString(expected);

        when(locationClient.get(uuid)).thenReturn(expected);

        given().when()
                .contentType(ContentType.JSON)
                .get(baseUrl + uuid).
        then()
                .statusCode(200)
                .body(equalTo(expectedString));
    }

    @Test
    public void getLocationPage() throws Exception {
        OpenHdsRestResponse<Location> response = RandomEntityFactory.createLocationResponse(20);
        when(locationClient.get(anyMap())).thenReturn(response);

        String expectedString = objectMapper.writeValueAsString(response.getContent());

        given().when()
                .contentType(ContentType.JSON)
                .get(baseUrl).
        then()
                .statusCode(200)
                .body(equalTo(expectedString));
    }

}
