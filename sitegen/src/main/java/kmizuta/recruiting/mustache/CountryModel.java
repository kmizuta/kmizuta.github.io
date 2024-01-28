package kmizuta.recruiting.mustache;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class CountryModel {
    boolean first;
    String country;
    ManagerModel manager;
    List<JobReqModel> jobreqs;

    public boolean isHasOpenReqs() {
        return ! jobreqs.stream().filter(req -> req.isOpen()).findFirst().isEmpty();
    }
}
