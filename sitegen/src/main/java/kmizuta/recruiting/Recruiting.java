package kmizuta.recruiting;

import java.io.InputStream;
import java.util.List;
import java.util.Map;

import org.yaml.snakeyaml.Yaml;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Recruiting {
    private static Yaml yaml = new Yaml();

    public static void main(String[] args) {
        Recruiting recruiting = getDefaultInstance();
        System.out.println(recruiting.managers.size());
    }

    public static Recruiting getDefaultInstance() {
        return getInstance(Recruiting.class
                        .getClassLoader()
                        .getResourceAsStream("recruiting.yaml"));
    }

    public static Recruiting getInstance(InputStream inputStream) {
        return yaml.loadAs(inputStream, Recruiting.class);
    }

    public Map<String, Manager> managers;
    public List<HiringArea> hiring;

    @Getter
    @Setter
    public static class Manager {
        public String name;
        public String linkedInId;
        public String email;
    }

    @Getter
    @Setter
    public static class HiringArea {
        public String area;
        public String description;
        public List<Country> countries;
    }

    @Getter
    @Setter
    public static class Country {
        public String country;
        public String manager;
        public List<JobReq> jobreqs;
    }

    @Getter
    @Setter
    public static class JobReq {
        public String reqno;
        public String level;
        public String linkedInJobId;
        public String notes;
        public String status;
    }
}