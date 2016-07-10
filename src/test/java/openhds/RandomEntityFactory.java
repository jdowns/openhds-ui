package openhds;

import com.google.common.collect.Lists;
import openhds.domain.OpenHdsRestResponse;
import openhds.domain.Page;
import openhds.location.Location;
import openhds.location.LocationRequest;
import org.apache.commons.lang3.RandomStringUtils;

import java.util.List;
import java.util.Random;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static java.lang.Math.abs;

public class RandomEntityFactory {

    private static final int dataLength = 10;
    private static final Random random = new Random();

    public static LocationRequest createLocationRequest() {
        Location location = new Location(
                RandomStringUtils.randomAlphabetic(dataLength),
                RandomStringUtils.randomAlphabetic(dataLength),
                null);

        LocationRequest request = new LocationRequest(location, RandomStringUtils.randomNumeric(32));
        return request;
    }

    public static Location createLocationResponse() {
        return new Location(
                RandomStringUtils.randomAlphabetic(dataLength),
                RandomStringUtils.randomAlphabetic(dataLength),
                UUID.randomUUID().toString());
    }

    public static Location createLocationResponse(LocationRequest request) {
        Location location = new Location(
                request.getLocation().getName(),
                request.getLocation().getType(),
                UUID.randomUUID().toString());
        return location;
    }

    public static List<Location> createLocationResponseList(int count) {
        return IntStream.range(0, count)
                .mapToObj(i -> createLocationResponse())
                .collect(Collectors.toList());
    }

    public static OpenHdsRestResponse<Location> createLocationResponse(int count) {
        final List<Object> link = Lists.newArrayList();
        final List<Location> locationResponseList = createLocationResponseList(count);
        final Page page = new Page(abs(random.nextLong()), abs(random.nextLong()), abs(random.nextLong()));
        OpenHdsRestResponse response = new OpenHdsRestResponse(link, locationResponseList, page);
        return response;
    }
}
