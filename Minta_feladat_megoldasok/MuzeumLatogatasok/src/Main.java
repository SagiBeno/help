import java.io.File;
import java.io.FileWriter;
import java.text.Collator;
import java.util.*;

public class Main {

    public static int wordCounter (String word) {
        String[] words = word.split(" ");
        int length = words.length;

        if (word.contains("-")) {
            String[] parts = word.split("-");
            length += parts.length;
        }

        return length;
    }

    public static void main(String[] args) {
        Collator collator = Collator.getInstance(new Locale("hu", "HU"));
        String filename = "exhibitions.csv";
        ArrayList<Visit> visits = LoadFromCSV.loadFromCSV(new File(filename));
        StringBuilder stringBuilder = new StringBuilder();

        stringBuilder.append("Az ").append(filename).append(" fájlból ").append(visits.size()).append(" látogatás adata beolvasva.");
        System.out.println(stringBuilder + "\n");
        stringBuilder.setLength(0);

        Visit longestVisit = visits.getFirst();

        for (Visit visit : visits) {
            double time = visit.getVisitTime();

            if (longestVisit.getVisitTime() < time) longestVisit = visit;
        }

        stringBuilder.append("A leghosszabb látogatás: ").append(longestVisit.getVisitName()).append(" - ").append(longestVisit.getMuseumName()).append(": ").append(longestVisit.getVisitTime()).append(" óra");
        System.out.println(stringBuilder + "\n");
        stringBuilder.setLength(0);

        ArrayList<Visit> guidedTours = new ArrayList<>();

        for (Visit visit : visits) {
            if (visit.getType().equalsIgnoreCase("guided tour") && !guidedTours.contains(visit)) guidedTours.add(visit);
        }

        guidedTours.sort(Comparator.comparing(Visit::getVisitTime).reversed());
        stringBuilder.append("A guided tour típusú látogatások (időtartam szerint csökkenőben):\n");

        for (Visit visit : guidedTours) {
            stringBuilder.append(visit.getVisitName()).append(" - ").append(visit.getMuseumName()).append(" (").append(visit.getVisitTime()).append(")\n");
        }

        System.out.println(stringBuilder);
        stringBuilder.setLength(0);

        ArrayList<String> museumNames = new ArrayList<>();
        for (Visit visit : visits) {
            String name = visit.getMuseumName();
            if (!museumNames.contains(name)) museumNames.add(name);
        }

        Random random = new Random();
        String randomMuseumName = museumNames.get(random.nextInt(museumNames.size()));
        stringBuilder.append("Összesen ").append(museumNames.size()).append(" múzeum található a fáljban\nKözölük egy véletlen kiválasztott: ").append(randomMuseumName).append(", látogatói:\n");
        for (Visit visit : visits) {
            if (visit.getMuseumName().equalsIgnoreCase(randomMuseumName)) {
                stringBuilder.append(visit.getVisitName()).append("\n");
            }
        }

        System.out.println(stringBuilder);
        stringBuilder.setLength(0);

        int longestMuseumNameLength = wordCounter(museumNames.getFirst());
        String longestMuseumName = museumNames.getFirst();

        for (String museum : museumNames) {
            int museumNameLength = wordCounter(museum);

            if (longestMuseumNameLength < museumNameLength) {
                longestMuseumNameLength = museumNameLength;
                longestMuseumName = museum;
            }
        }

        stringBuilder.append("Legtöbb szóból álló múzeumnév: ").append(longestMuseumName);
        System.out.println(stringBuilder + "\n");
        stringBuilder.setLength(0);

        TreeMap<String, Integer> visitByVisitNumber = new TreeMap<>(collator);

        for (Visit visit : visits) {
            String key = visit.getCity();

            if (visitByVisitNumber.containsKey(key)) {
                int value = visitByVisitNumber.get(key) + 1;
                visitByVisitNumber.put(key, value);
            } else {
                visitByVisitNumber.put(key, 1);
            }
        }

        stringBuilder.append("Látogatások száma városonként: ");
        for (Map.Entry<String, Integer> data : visitByVisitNumber.entrySet()) {
            stringBuilder.append(data.getKey()).append(" (").append(data.getValue()).append("), ");
        }

        stringBuilder.deleteCharAt(stringBuilder.length() - 2);
        System.out.println(stringBuilder + "\n");
        stringBuilder.setLength(0);

        try {
            filename = "rovid_latogatasok.txt";
            File outputFile = new File(filename);
            FileWriter writer = new FileWriter(outputFile);

            for (Visit visit : visits) {
                if (visit.getVisitTime() < 2) {
                    stringBuilder.append(visit.getVisitName()).append(" - ").append(visit.getMuseumName()).append(": ").append(visit.getVisitTime()).append(" óra\n");
                }
            }

            writer.write(String.valueOf(stringBuilder));
            writer.close();
            System.out.println("A 2 óránál rövidebb látogatások adatai kiírva a " + filename + " fájlba.");

        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("A mentés sikertelen");
        }
    }
}