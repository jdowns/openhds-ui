package openhds.domain;

import java.util.List;

public class OpenHdsRestResponse<T extends Model> {
    public class Page {
        Long size;
        Long totalElements;
        Long totalPages;

        public Long getSize() {
            return size;
        }

        public void setSize(Long size) {
            this.size = size;
        }

        public Long getTotalElements() {
            return totalElements;
        }

        public void setTotalElements(Long totalElements) {
            this.totalElements = totalElements;
        }

        public Long getTotalPages() {
            return totalPages;
        }

        public void setTotalPages(Long totalPages) {
            this.totalPages = totalPages;
        }
    }

    List<Object> link;
    List<T> content;
    Page page;

    public List<Object> getLink() {
        return link;
    }

    public void setLink(List<Object> link) {
        this.link = link;
    }

    public List<T> getContent() {
        return content;
    }

    public void setContent(List<T> content) {
        this.content = content;
    }

    public Page getPage() {
        return page;
    }

    public void setPage(Page page) {
        this.page = page;
    }
}
