import java.io.File;
import java.util.ArrayList;
import java.util.Scanner;

public class LoadFromCSV {
    public static ArrayList<Visit> loadFromCSV (File file) {

        ArrayList<Visit> visits = new ArrayList<>();

        try {
            Scanner reader = new Scanner(file);
            reader.nextLine();

            while (reader.hasNextLine()) {
                String line = reader.nextLine();
                String[] parts = line.split(",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)", -1);

                if (parts.length > 0) {

                    for (int i = 0; i < parts.length; i++) {
                        parts[i] = parts[i].trim().replaceAll("^\"|\"$", "");
                    }

                    String visitName = parts[0];
                    String description = parts[1];
                    Double visitTime = Double.parseDouble(parts[2]);
                    String museumName = parts[3];
                    String city = parts[4];
                    String type = parts[5];

                    visits.add(new Visit(visitName, description, visitTime, museumName, city, type));
                }

            }
            reader.close();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return visits;
    }
}
