package kmizuta.idcs;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class Idcs {
    @JsonProperty(value = "$schema")
    private String schemaUrl;
    private App app;
}
