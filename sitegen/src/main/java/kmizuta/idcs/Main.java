package kmizuta.idcs;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;

public class Main {
    public static void main(String[] args)  {
        Validator validator = new Validator();
        for (final String file : args) {
            List<String> errors = validator.validate(file);
            if (errors != null && errors.size() > 0) {
                System.err.printf("Errors found in file %s\n", file);
                for (String error: errors) {
                    System.err.print("\t");
                    System.err.println(error);
                }
            }
        }
    }
}
