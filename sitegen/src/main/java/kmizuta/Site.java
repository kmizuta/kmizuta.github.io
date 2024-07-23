package kmizuta;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;

import kmizuta.recruiting.Recruiting;
import kmizuta.recruiting.Target;
import kmizuta.recruiting.mustache.Formatter;

public class Site {

    public static void main(String[] args) {
        if (args.length != 3) {
            System.err.printf("Syntax: java %s <recruiting.yaml> <web root> <project directory>", Site.class.getCanonicalName());
            System.exit(-1);
        }

        File recruitingYaml = new File(args[0]);
        File webRoot = new File(args[1]);
        File projectDir = new File(args[2]);

        System.out.printf("Recruiting source = %s\n", recruitingYaml.getAbsolutePath());
        System.out.printf("Web Root          = %s\n", webRoot.getAbsolutePath());
        System.out.printf("Project Directory = %s\n", projectDir.getAbsolutePath());

        Formatter formatter = new Formatter();
        try {
            Recruiting recruiting = Recruiting.getInstance();
            try (FileWriter writer = new FileWriter(new File(webRoot, "recruiting.html"))) {
                formatter.write(writer, recruiting, Target.ONLINE);
            }
            try (FileWriter writer = new FileWriter(new File(projectDir, "target/recruiting-confluence.html"))) {
                formatter.write(writer, recruiting, Target.CONFLUENCE);
            }
        } catch(IOException ioe) {
            ioe.printStackTrace();
        }
    }
    
}
