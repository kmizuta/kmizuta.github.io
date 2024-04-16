package kmizuta.idcs;

import lombok.Getter;

import java.util.List;

@Getter
public class App {
    private String displayName;
    private String resourcePrefix;
    private String operation;
    private String faVersion;
    private String description;
    private String landingPageURL;

    private List<ResourceUrl> resourceUrls;
}