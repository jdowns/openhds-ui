package openhds.location;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import openhds.domain.Model;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

public class Location implements Model {

    private final String uuid;
    private final String name;
    private final String type;

    @JsonCreator
    public Location(@JsonProperty("name") String name, @JsonProperty("type") String type, @JsonProperty("uuid") String uuid) {
        this.name = name;
        this.type = type;
        this.uuid = uuid;
    }

    public String getName() {
        return name;
    }

    public String getType() {
        return type;
    }

    public String getUuid() { return uuid; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass()) return false;

        Location location = (Location) o;

        return new EqualsBuilder()
                .append(uuid, location.uuid)
                .append(name, location.name)
                .append(type, location.type)
                .isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37)
                .append(uuid)
                .append(name)
                .append(type)
                .toHashCode();
    }
}
