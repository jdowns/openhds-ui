package openhds.domain;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class OpenHdsRestResponse<T extends Model> {

    List<Object> link;
    List<T> content;
    Page page;

    @JsonCreator
    public OpenHdsRestResponse(@JsonProperty("link") List<Object> link, @JsonProperty("content") List<T> content, @JsonProperty("page") Page page) {
        this.link = link;
        this.content = content;
        this.page = page;
    }

    public List<Object> getLink() {
        return link;
    }

    public List<T> getContent() {
        return content;
    }

    public Page getPage() {
        return page;
    }
}
