public class Visit {
    String visitName;
    String description;
    Double visitTime;
    String museumName;
    String city;
    String type;

    public void setVisitName(String visitName) {
        this.visitName = visitName;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setVisitTime(Double visitTime) {
        this.visitTime = visitTime;
    }

    public void setMuseumName(String museumName) {
        this.museumName = museumName;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getVisitName() {
        return visitName;
    }

    public String getDescription() {
        return description;
    }

    public Double getVisitTime() {
        return visitTime;
    }

    public String getMuseumName() {
        return museumName;
    }

    public String getCity() {
        return city;
    }

    public String getType() {
        return type;
    }

    public Visit (
            String visitName, String description, Double visitTime, String museumName, String city, String type
    ) {
        this.setVisitName(visitName);
        this.setDescription(description);
        this.setVisitTime(visitTime);
        this.setMuseumName(museumName);
        this.setCity(city);
        this.setType(type);
    }
}
