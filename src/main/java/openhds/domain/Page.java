package openhds.domain;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Page {
    Long size;
    Long totalElements;
    Long totalPages;

    @JsonCreator
    public Page(@JsonProperty("size") Long size, @JsonProperty("totalElements") Long totalElements, @JsonProperty("totalPages") Long totalPages) {
        this.size = size;
        this.totalElements = totalElements;
        this.totalPages = totalPages;
    }

    public Long getSize() {
        return size;
    }

    public Long getTotalElements() {
        return totalElements;
    }

    public Long getTotalPages() {
        return totalPages;
    }
}