package kmizuta.idcs;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Validator {

    private List<String> errors;

    public List<String> validate(String filename) {
        errors = new ArrayList<>();
        try {
            ObjectMapper mapper = new ObjectMapper();
            Idcs idcs = mapper.readValue(new FileInputStream(filename), Idcs.class);
            validate(idcs);
        } catch(IOException ioe) {
            ioe.printStackTrace();
        }
        return errors;
    }

    private void validate(Idcs idcs) {
        validate(idcs.getApp());
    }

    private void validate(App app) {
        checkNotEmpty("app.displayName", app.getDisplayName());
        checkNotEmpty("app.resourcePrefix", app.getResourcePrefix());
        checkNotEmpty("app.faVersion", app.getFaVersion());
        checkNotEmpty("app.description", app.getDescription());
        checkNotEmpty("app.landingPageURL", app.getLandingPageURL());

        if (!app.getResourcePrefix().equals("/" + app.getDisplayName()))
            errors.add("Property app.displayName should be the name of the resourcePrefix");
        if (!"add".equals(app.getOperation()))
            errors.add("Property app.operation must be \"add\"");
        if (!app.getFaVersion().equals("11.13.25.01.0"))
            errors.add("Property app.faVersion must be 11.13.25.01.0");
        if (!app.getDescription().equals(app.getDisplayName()))
            errors.add("Property app.description should be the name of the resourcePrefix");
        if (!app.getLandingPageURL().equals("@podUrl@/" + app.getDisplayName()))
            errors.add("Property app.landingPageURL should be the resourcePrefix with @podUrl@/ at the beginning");

        List<ResourceUrl> resUrls = app.getResourceUrls();
        int urlLen = resUrls.size();
        for (int i=0; i<urlLen; i++)
            validate(app, i, resUrls.get(i));
    }

    private void validate(App app, int index, ResourceUrl resourceUrl) {
        checkNotEmpty(String.format("app.resourceUrls[%d].name", index), resourceUrl.getName());
        checkNotEmpty(String.format("app.resourceUrls[%d].faVersion", index), resourceUrl.getFaVersion());
        checkNotEmpty(String.format("app.resourceUrls[%d].resourceUrl", index), resourceUrl.getResourceURL());
        checkNotEmpty(String.format("app.resourceUrls[%d].description", index), resourceUrl.getDescription());
        checkNotEmpty(String.format("app.resourceUrls[%d].authnMethod", index), resourceUrl.getAuthnMethod());

        if (! resourceUrl.getName().startsWith(app.getResourcePrefix()))
            errors.add(String.format("Property app.resourceUrls[%d].name (%s, %s) should start with /app.resourcePrefix/", index, resourceUrl.getName(),app.getResourcePrefix()));
        if (!"add".equals(resourceUrl.getOperation()))
            errors.add(String.format("Property app.resourceUrls[%d].operation must be \"add\"", index));
        if (!resourceUrl.getFaVersion().equals("11.13.25.01.0"))
            errors.add(String.format("Property app.resourceUrls[%d].faVersion must be 11.13.25.01.0", index));
        if (!resourceUrl.getDescription().equals(resourceUrl.getResourceURL()))
            errors.add(String.format("Property app.resourceUrls[%d].resourceURL should be the same as app.resourceUrls[%d].description (%s != %s)", index, index, resourceUrl.getResourceURL(), resourceUrl.getDescription()));
        if (!checkNotEquals(resourceUrl.getAuthnMethod(), "public", "anonymous", "oauth+logout"))
            errors.add(String.format("Property app.resourceUrls[%d].authnMethod (%s) must be one of public, anonymous, or oauth+logout", index, resourceUrl.getAuthnMethod()));
    }

    private void checkNotEmpty(String property, String value) {
        if (value == null || "".equals(value))
            errors.add(String.format("Property %s cannot be null or empty", property));
    }

    private boolean checkNotEquals(String value, String... allowedValues) {
        for (String av : allowedValues)
            if (value.equals(av)) return true;
        return false;
    }
}
