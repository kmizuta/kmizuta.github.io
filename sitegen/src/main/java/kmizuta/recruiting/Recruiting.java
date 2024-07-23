package kmizuta.recruiting;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.*;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import lombok.*;
import org.yaml.snakeyaml.Yaml;

@Getter
@Setter
public class Recruiting {
    private static Yaml yaml = new Yaml();

    public static Recruiting getInstance(InputStream inputStream) {
        return yaml.loadAs(inputStream, Recruiting.class);
    }

    public static Recruiting getInstance() {
        var recruiting = new Recruiting();
        recruiting.setManagers(getApexManagers());
        recruiting.setHiring(getApexHiringAreas());
        return recruiting;
    }

    public static void main(String[] args) {
        var recruiting = getInstance();
        System.out.println(recruiting);
    }
    private final static String MANAGERS_URL = "https://apex.oraclecorp.com/pls/apex/techarch/ta/recruiting/managers";
    private final static String AREAS_URL = "https://apex.oraclecorp.com/pls/apex/techarch/ta/recruiting/areas";
    private final static String COUNTRY_MANAGERS_URL = "https://apex.oraclecorp.com/pls/apex/techarch/ta/recruiting/areas/{ID}/countryManagers";
    private final static String JOBREQS_URL = "https://apex.oraclecorp.com/pls/apex/techarch/ta/recruiting/areas/{ID}/countryManagers/{COUNTRY}/{GUID}";


    private static List<HiringArea> getApexHiringAreas() {
        var hiringAreas = new ArrayList<HiringArea>();
        getItems(AREAS_URL).elements().forEachRemaining(a -> {
            hiringAreas.add(HiringArea.builder()
                    .area(getFieldValue(a, "name"))
                    .description(getFieldValue(a, "description"))
                    .countries(getApexCountries(getFieldValue(a, "id")))
                    .build());
        });
        return hiringAreas;
    }

    private static List<Country> getApexCountries(String areaId) {
        var countries = new ArrayList<Country>();
        var url = COUNTRY_MANAGERS_URL.replace("{ID}", areaId);
        getItems(url).elements().forEachRemaining(cm -> {
            var country = Objects.requireNonNull(getFieldValue(cm, "country"));
            var guid = Objects.requireNonNull(getFieldValue(cm, "global_uid"));
            countries.add(Country.builder()
                            .country(country)
                            .manager(guid)
                            .jobreqs(getApexJobReqs(areaId, country, guid))
                            .build());
        });
        return countries;
    }

    private static List<JobReq> getApexJobReqs(String areaId, String country, String guid) {
        var jobreqs = new ArrayList<JobReq>();
        var url = JOBREQS_URL
                .replace("{ID}", areaId)
                .replace("{COUNTRY}", country)
                .replace("{GUID}", guid);
        getItems(url).elements().forEachRemaining( j -> {
            jobreqs.add(JobReq.builder()
                    .reqno(getFieldValue(j, "reqno"))
                    .level(getFieldValue(j, "job_level"))
                    .status(getFieldValue(j, "status_code"))
                    .notes(getFieldValue(j, "notes"))
                    .build());
        });
        return jobreqs;
    }

    private static Map<String, Manager> getApexManagers() {
        var managers = new HashMap<String, Manager>();
        getItems(MANAGERS_URL).elements().forEachRemaining( m -> {
            managers.put(getFieldValue(m, "global_uid"), Manager.builder()
                            .email(getFieldValue(m, "email"))
                            .name(getFieldValue(m, "name"))
                            .linkedInId(getFieldValue(m, "linkedin_id"))
                            .build());
        });
        return managers;
    }

    private static ArrayNode getItems(final String urlString) {
        var mapper = new ObjectMapper();
        try {
            var url = new URI(urlString).toURL();
            var jsonNode = mapper.readValue(url, JsonNode.class);
            var items = jsonNode.get("items");
            if (items.isArray())
                return (ArrayNode) items;
            else
                return null;
        } catch (URISyntaxException | IOException e) {
            throw new RuntimeException(e);
        }
    }

    private static String getFieldValue(JsonNode node, String fieldName) {
        var field = node.get(fieldName);
        if (field == null) return "";
        var fieldValue = field.asText();
        return "null".equals(fieldValue) ? "" : fieldValue; // TODO: Have to figure out how to parse null as null instead of "null"
    }

    public Map<String, Manager> managers;
    public List<HiringArea> hiring;

    @Getter
    @Setter
    @Builder
    public static class Manager {
        public String name;
        public String linkedInId;
        public String email;
    }

    @Getter
    @Setter
    @Builder
    public static class HiringArea {
        public String area;
        public String description;
        public List<Country> countries;
    }

    @Getter
    @Setter
    @Builder
    public static class Country {
        public String country;
        public String manager;
        public List<JobReq> jobreqs;
    }

    @Getter
    @Setter
    @Builder
    public static class JobReq {
        public String reqno;
        public String level;
        public String linkedInJobId;
        public String notes;
        public String status;
	    public String filledDate;
    }
}
