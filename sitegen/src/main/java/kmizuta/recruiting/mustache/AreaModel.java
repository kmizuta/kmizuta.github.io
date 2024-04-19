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
public class AreaModel {
    String name;
    String description;
    int count;
    List<CountryModel> countries;

    public boolean isAreaHasOpenReqs() {
	return ! countries.stream().filter(country -> country.isHasOpenReqs()).findFirst().isEmpty();
    }
}
