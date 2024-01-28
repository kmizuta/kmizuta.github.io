package kmizuta.recruiting.mustache;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class JobReqModel {
    String level;
    String reqno;
    boolean last;
    String notes;
    String status;

    public boolean isOpen() {
        return "open".equals(status);
    }

    public boolean isPending() {
        return status != null && status.contains("pending");
    }

    public boolean isClosed() {
        return !isOpen() && !isPending();
    }

    public String getReqUrl() {
        return String.format("https://careers.oracle.com/jobs/#en/sites/jobsearch/requisitions/preview/%s", reqno);
    }
}
