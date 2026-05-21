import java.io.File;
import java.io.FileWriter;
import java.text.Collator;
import java.util.*;
import java.util.stream.Collectors;

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
        List<Visit> visits = LoadFromCSV.loadFromCSV(new File(filename));
        StringBuilder stringBuilder = new StringBuilder();

        System.out.printf("Az %s fájlból %d látogatás adata beolvasva.\n\n", filename, visits.size());

        Visit longestVisit = visits.stream()
                .sorted(Comparator.comparing(Visit::getVisitTime).reversed())
                .toList()
                .getFirst();

        System.out.printf("A leghosszabb látogatás: %s - %s: %.1f óra\n\n", longestVisit.getVisitName(), longestVisit.getMuseumName(), longestVisit.getVisitTime());

        stringBuilder.append("A guided tour típusú látogatások (időtartam szerint csökkenőben):\n");

        visits.stream()
                .filter(visit -> visit.getType().equalsIgnoreCase("guided tour"))
                .sorted(Comparator.comparing(Visit::getVisitTime).reversed())
                .forEach(visit -> stringBuilder.append(visit.getVisitName()).append(" - ").append(visit.getMuseumName()).append(" (").append(visit.getVisitTime()).append(")\n"));

        System.out.println(stringBuilder);
        stringBuilder.setLength(0);

        List<String> museumNames = visits.stream()
                .map(Visit::getMuseumName)
                .distinct()
                .toList();

        Random random = new Random();
        String randomMuseumName = museumNames.get(random.nextInt(museumNames.size()));
        stringBuilder.append("Összesen ").append(museumNames.size()).append(" múzeum található a fáljban\nKözölük egy véletlen kiválasztott: ").append(randomMuseumName).append(", látogatói:\n");

        visits.stream()
                .filter(visit -> visit.getMuseumName().equalsIgnoreCase(randomMuseumName))
                .forEach(visit -> stringBuilder.append(visit.getVisitName()).append("\n"));

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

        Map<String, Long> visitByVisitNumber = visits.stream()
                .collect(Collectors.groupingBy(
                        Visit::getCity,
                        () -> new TreeMap<>(collator),
                        Collectors.counting()
                ));

        stringBuilder.append("Látogatások száma városonként: ");
        visitByVisitNumber.forEach((key, value) -> {
            stringBuilder.append(key).append(" (").append(value).append("), ");
        });

        stringBuilder.delete(stringBuilder.length() - 2, stringBuilder.length());
        System.out.println(stringBuilder + "\n");
        stringBuilder.setLength(0);

        try {
            filename = "rovid_latogatasok.txt";
            File outputFile = new File(filename);
            FileWriter writer = new FileWriter(outputFile);

            visits.stream()
                    .filter(visit -> visit.getVisitTime() < 2)
                    .forEach(visit -> stringBuilder.append(visit.getVisitName()).append(" - ").append(visit.getMuseumName()).append(": ").append(visit.getVisitTime()).append(" óra\n"));

            writer.write(stringBuilder.toString());
            writer.close();
            System.out.printf("A 2 óránál rövidebb látogatások adatai kiírva a %s fájlba.", filename);

        } catch (Exception e) {
            System.out.println("A mentés sikertelen");
            throw new RuntimeException(e);
        }
    }
}