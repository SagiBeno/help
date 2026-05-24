import java.io.File;
import java.util.ArrayList;
import java.util.Scanner;

public class LoadFromCSV {
    public static ArrayList<TODO> loadFromCSV (File file) {

        ArrayList<TODO> list = new ArrayList<>();

        try {
            Scanner reader = new Scanner(file);
            reader.nextLine();

            while (reader.hasNextLine()) {
                String line = reader.nextLine();
                
                if (!line.isBlank) {
                    String[] parts = line.split("; ");
                }

            }
            reader.close();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return list;
    }
}
