package kmizuta.recruiting.mustache;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.Reader;
import java.io.Writer;
import java.util.List;
import java.util.stream.Collectors;

import com.github.mustachejava.DefaultMustacheFactory;
import com.github.mustachejava.Mustache;
import com.github.mustachejava.MustacheFactory;

import kmizuta.recruiting.Recruiting;
import kmizuta.recruiting.Target;
import kmizuta.recruiting.Recruiting.Country;
import kmizuta.recruiting.Recruiting.HiringArea;
import kmizuta.recruiting.Recruiting.JobReq;
import kmizuta.recruiting.Recruiting.Manager;

public class Formatter {

    final private Mustache mustache;

    public Formatter() {
        InputStream inputStream = getClass()
                    .getClassLoader()
                    .getResourceAsStream("recruiting.mustache");
        Reader reader = new InputStreamReader(inputStream);
        MustacheFactory mf = new DefaultMustacheFactory();
        mustache = mf.compile(reader, "recruiting");
    }

    public void write(Writer writer, Recruiting recruiting, Target target) {
        RecruitingModel recruitingModel = toRecruitingModel(target, recruiting);
        mustache.execute(writer, recruitingModel);
    }

    private RecruitingModel toRecruitingModel(final Target target, Recruiting recruiting) {
        return RecruitingModel.builder()
                .areas(toAreaModelList(target, recruiting))
                .online(target == Target.ONLINE)
                .build();
    }

    private List<AreaModel> toAreaModelList(final Target target, final Recruiting recruiting) {
        return recruiting.hiring.stream()
                .map(hiringArea -> toAreaModel(target, recruiting, hiringArea))
                .collect(Collectors.toUnmodifiableList());
    }

    private AreaModel toAreaModel(final Target target, final Recruiting recruiting, final HiringArea hiringArea) {
        return AreaModel.builder()
                .name(hiringArea.area)
                .description(hiringArea.description)
                .count(hiringArea.countries.size())
                .countries(toCountryList(target, recruiting, hiringArea))
                .build();
    }

    private List<CountryModel> toCountryList(final Target target, final Recruiting recruiting, final HiringArea hiringArea) {
        return hiringArea.countries.stream()
                .map(country -> toCountryModel(target, recruiting, hiringArea, country))
                .collect(Collectors.toUnmodifiableList());
    }

    private CountryModel toCountryModel(final Target target, 
                                    final Recruiting recruiting,
                                    final HiringArea hiringArea,
                                    final Country country) {
        boolean first = country == hiringArea.countries.get(0);
        return CountryModel.builder()
                .first(first)
                .country(country.country)
                .manager(toManager(target, recruiting, hiringArea, country))
                .jobreqs(toJobReqList(target, recruiting, hiringArea, country))
                .build();
    }

    private ManagerModel toManager(final Target target, 
                                final Recruiting recruiting, 
                                final HiringArea hiringArea, 
                                final Country country) {
        String uid = country.manager;
        Manager manager = recruiting.managers.get(uid);

        ManagerModel managerModel = ManagerModel.builder()
                .uid(uid)
                .name(manager.name)
                .linkedInId(manager.linkedInId)
                .email(manager.email)
                .build();
        
        String url = 
                (target == Target.ONLINE ? 
                   (managerModel.getLinkedInId() != null  ? 
                      managerModel.getLinkedInUrl() :
                      (managerModel.getEmail() != null ? 
                         managerModel.getEmailUrl() :
                         null)) :
                    managerModel.getAriaUrl()
                );
        managerModel.setUrl(url);

        return managerModel;
    }

    private List<JobReqModel> toJobReqList(final Target target, 
                                final Recruiting recruiting, 
                                final HiringArea hiringArea, 
                                final Country country) {
        return country.jobreqs.stream()
                .map(jobreq -> toJobReqModel(target, recruiting, hiringArea, country, jobreq))
                .collect(Collectors.toUnmodifiableList());
    }

    private JobReqModel toJobReqModel(final Target target, 
                            final Recruiting recruiting,
                            final HiringArea hiringArea,
                            final Country country,
                            final JobReq jobreq) {
        return JobReqModel.builder()
                .level(jobreq.level)
                .reqno(jobreq.reqno)
                .last(country.jobreqs.getLast() == jobreq)
                .notes(jobreq.notes)
                .status(jobreq.status)
                .build();
    }

    public static void main(String[] args) throws IOException {
        Target target = (args.length > 0 && "confluence".equalsIgnoreCase(args[0]) ? Target.CONFLUENCE : Target.ONLINE);

        Formatter formatter = new Formatter();
        Recruiting recruiting = Recruiting.getDefaultInstance();
        Writer writer = new OutputStreamWriter(System.out);
        formatter.write(writer, recruiting, target);
        writer.flush();
    }
    
}
