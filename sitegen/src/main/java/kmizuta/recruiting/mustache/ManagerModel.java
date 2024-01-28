package kmizuta.recruiting.mustache;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class ManagerModel {
    String uid;
    String name;
    String linkedInId;
    String email;
    String url;

    public String getLinkedInUrl() {
        return linkedInId == null ? null :
                String.format("https://www.linkedin.com/in/%s/", linkedInId);
    }

    public String getEmailUrl() {
        return email == null ? null :
                String.format("mailto:%s", email);
    }

    public String getAriaUrl() {
        return String.format("https://people.oracle.com/@%s", uid);
    }

}
