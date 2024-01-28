package kmizuta;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

import kmizuta.recruiting.Recruiting;
import kmizuta.recruiting.Target;
import kmizuta.recruiting.mustache.Formatter;

public class Site {

    public static void main(String[] args) throws IOException {
        if (args.length == 0) {
            System.err.printf("Syntax: java %s <project directory>", Site.class.getCanonicalName());
            System.exit(-1);
        }

        File projectDir = new File(args[0]);
        File webRoot = projectDir.getParentFile();

        Formatter formatter = new Formatter();
        Recruiting recruiting = Recruiting.getDefaultInstance();
        try (FileWriter writer = new FileWriter(new File(webRoot, "recruiting.html"))) {
            formatter.write(writer, recruiting, Target.ONLINE);
        }
        try (FileWriter writer = new FileWriter(new File(projectDir, "target/recruiting-confluence.html"))) {
            formatter.write(writer, recruiting, Target.CONFLUENCE);
        }
    }
    
}
