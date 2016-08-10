package openhds.location;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

public class LocationRequest extends openhds.domain.Request {
    private Location location;

    @JsonCreator
    public LocationRequest(@JsonProperty("location") Location location, @JsonProperty("collectedByUuid") String collectedByUuid) {
        this.location = location;
        this.collectedByUuid = collectedByUuid;
    }

    public Location getLocation() {
        return location;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass()) return false;

        LocationRequest that = (LocationRequest) o;

        return new EqualsBuilder()
                .append(location, that.location)
                .isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37)
                .append(location)
                .toHashCode();
    }
}
