package openhds;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import openhds.domain.Model;
import openhds.domain.OpenHdsRestResponse;
import openhds.domain.Request;
import org.junit.Test;
import org.junit.runner.RunWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class ControllerTest<MODEL extends Model> {

    @Mock
    protected RestClient<MODEL> client;

    @InjectMocks
    protected ControllerBase underTest;
    protected MODEL expected;

    @Test
    public void createTest() {
        Request request = new Request();
        when(client.create(request)).thenReturn(expected);

        final ResponseEntity<Model> modelResponseEntity = underTest.create(request);
        assertEquals(expected, modelResponseEntity.getBody());
        assertEquals(HttpStatus.CREATED, modelResponseEntity.getStatusCode());
    }

    @Test
    public void getTest() {
        Map<String, Object> filterParams = Maps.newHashMap();
        filterParams.put("page", 0L);
        filterParams.put("size", 1L);
        filterParams.put("sort", false);
        List<MODEL> expectedContent = Lists.newArrayList();
        OpenHdsRestResponse<MODEL> expectedResponse = new OpenHdsRestResponse<>(null, expectedContent, null);
        when(client.get(filterParams)).thenReturn(expectedResponse);
        final ResponseEntity<List<MODEL>> models = underTest.get(0L, 1L, false);

        assertEquals(HttpStatus.OK, models.getStatusCode());
        assertEquals(expectedContent, models.getBody());
    }

    @Test
    public void getAllTest() {
        List<MODEL> expectedContent = Lists.newArrayList();
        OpenHdsRestResponse<MODEL> expected = new OpenHdsRestResponse<>(null, expectedContent, null);
        when(client.getAll()).thenReturn(expected);

        final ResponseEntity<List<Model>> all = underTest.getAll();

        assertEquals(HttpStatus.OK, all.getStatusCode());
        assertEquals(expectedContent, all.getBody());
    }

    @Test
    public void getOneTest() {
        String uuid = UUID.randomUUID().toString();

        when(client.get(uuid)).thenReturn(expected);

        final ResponseEntity<MODEL> one = underTest.get(uuid);

        assertEquals(HttpStatus.OK, one.getStatusCode());
        assertEquals(expected, one.getBody());
    }

    @Test
    public void getFilteredTest() {
        UUID locationHierarchyUuid = UUID.randomUUID();
        UUID locationUuid = UUID.randomUUID();
        Date afterDate = new Date();
        Date beforeDate = new Date();
        Map<String, Object> filterParams = HttpParamService.locationHierarchyFilter(locationHierarchyUuid.toString(), afterDate, beforeDate);

        List<MODEL> expectedContent = Lists.newArrayList();
        OpenHdsRestResponse<MODEL> expected = new OpenHdsRestResponse<>(null, expectedContent, null);
        when(client.getFilteredByLocationHierarchy(filterParams)).thenReturn(expected);

        final ResponseEntity<List<MODEL>> allFiltered = underTest.getAllFiltered(locationHierarchyUuid.toString(), locationUuid.toString(), afterDate, beforeDate);

        assertEquals(HttpStatus.OK, allFiltered.getStatusCode());
        assertEquals(expectedContent, allFiltered.getBody());
    }

    @Test
    public void getVoidedTest() {
        List<MODEL> expectedContent = Lists.newArrayList();
        OpenHdsRestResponse<MODEL> expectedResponse = new OpenHdsRestResponse<>(null, expectedContent, null);

        when(client.getVoided()).thenReturn(expectedResponse);

        final ResponseEntity<List<MODEL>> voided = underTest.getVoided();
        assertEquals(HttpStatus.OK, voided.getStatusCode());
        assertEquals(expectedContent, voided.getBody());
    }

    @Test
    public void deleteTest() {
        UUID uuid = UUID.randomUUID();

        underTest.delete(uuid.toString());

        verify(client, times(1)).delete(uuid.toString());
    }

}
