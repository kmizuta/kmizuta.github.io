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

    public boolean isOfferPending() {
	return "offerpending".equals(status);
    }

    public String getReqUrl() {
        return String.format("https://careers.oracle.com/jobs/#en/sites/jobsearch/requisitions/preview/%s", reqno);
    }

    public String getNotificationUrl() {
	return String.format("https://eeho.fa.us2.oraclecloud.com/fscmUI/redwood/core/approvals/approval-processes?appliedFiltersStr=%%5B%%7B%%22filter%%22%%3A%%22keyword%%22%%2C%%22label%%22%%3A%%22%s%%22%%2C%%22value%%22%%3A%%22%s%%22%%7D%%5D", reqno, reqno);
    }
}


