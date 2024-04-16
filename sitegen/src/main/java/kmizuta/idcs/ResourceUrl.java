package kmizuta.idcs;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class ResourceUrl {
    private String name;
    private String operation;
    private String faVersion;
    private String resourceURL;
    @JsonProperty(value = "isRegex")
    private boolean regex;
    private String description;
    private String authnMethod;
}
