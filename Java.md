# Java segédlet

## HashMap rendezése érték alapján

### Növekvő sorrend érték szerint
```
Map<String, Integer> map = new HashMap<>();

Map<String, Integer> rendezett = map.entrySet()
        .stream()
        .sorted(Map.Entry.comparingByValue())
        .collect(Collectors.toMap(
                Map.Entry::getKey,
                Map.Entry::getValue,
                (a, b) -> a,
                LinkedHashMap::new
        ));
```

### Csökkenő sorrend érték szerint
```
Map<String, Integer> rendezett = map.entrySet()
        .stream()
        .sorted(Map.Entry.<String, Integer>comparingByValue().reversed())
        .collect(Collectors.toMap(
                Map.Entry::getKey,
                Map.Entry::getValue,
                (a, b) -> a,
                LinkedHashMap::new
        ));
```

## Magyar szövegek rendezése – Collator

### Magyar abc szerinti rendezés

```
Collator collator = Collator.getInstance(new Locale("hu", "HU"));

lista.sort(collator);
lista.sort((a, b) -> collator.compare(a.getNev(), b.getNev()));
lista.sort(Comparator.comparing(Osztaly::getNev, collator))
```

## Regex
```
String[] parts = line.split(",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)", -1);
```

## Dátum

### LocalTime
#### Létrehozás
```
LocalTime ido = LocalTime.of(14, 30);
LocalTime ido = LocalTime.parse("14:30");
```

#### Óra / perc lekérése
```
ido.getHour();
ido.getMinute();
```

#### Összehasonlítás
```
ido1.isBefore(ido2);
ido1.isAfter(ido2);
ido1.equals(ido2);
```

#### Különbség
```
Duration duration = Duration.between(ido1, ido2);

duration.toMinutes();
duration.toHours();
```

#### Műveletek
```
ido.plusMinutes(15);
ido.plusHours(2);
ido.minusMinutes(10);
```

### LocalDate
#### Létrehozás
```
LocalDate datum = LocalDate.of(2024, 5, 21);
LocalDate datum = LocalDate.parse("2024-05-21");
```

#### Év / hónap / nap
```
datum.getYear();
datum.getMonthValue();
datum.getDayOfMonth();
```

#### Összehasonlítás
```
datum1.isBefore(datum2);
datum1.isAfter(datum2);
datum1.equals(datum2);
```

#### Dátum különbség
```
Period period = Period.between(datum1, datum2);

period.getYears();
period.getMonths();
period.getDays();
```

#### Napok különbsége
```
long napok = Duration.between(
        datum1.atStartOfDay(),
        datum2.atStartOfDay()
).toDays();
```

#### Műveletek
```
datum.plusDays(10);
datum.plusMonths(2);
datum.plusYears(1);
datum.minusDays(5);
```

### LocalDateTime

#### Létrehozás
```
LocalDateTime dt = LocalDateTime.of(2024, 5, 21, 14, 30);

DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
LocalDateTime dt = LocalDateTime.parse("2024.05.21 14:30", formatter);
```

#### Dátum és idő lekérése
```
dt.toLocalDate();
dt.toLocalTime();
```

#### Összehasonlítás
```
dt1.isBefore(dt2);
dt1.isAfter(dt2);
```

#### Különbségek
```
Duration.between(dt1, dt2).toMinutes();
Duration.between(dt1, dt2).toHours();
```

#### Műveletek
```
dt.plusDays(1);
dt.plusHours(3);
dt.plusMinutes(30);
```