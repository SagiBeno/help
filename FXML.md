# Java - FXML

## ChoiceBox

### FXML file
```
<ChoiceBox fx:id="retrievingDataChoiceBox" onAction="#handleChoiceBox" prefWidth="150.0">
   <HBox.margin>
      <Insets left="10.0" />
   </HBox.margin>
</ChoiceBox>
```

### Controller
```
@FXML public void handleChoiceBox() {
    String value = retrievingDataChoiceBox.getValue();

    if (value.equalsIgnoreCase("Versek")) versekKiirasa();
    if (value.equalsIgnoreCase("Locsolók")) fiuLocsolokKiirasa();
}
```

## Névjegy
```
@FXML private void Nevjegy() {
    Alert nevjegy = new Alert(Alert.AlertType.INFORMATION);
    nevjegy.setTitle("Névjegy");
    nevjegy.setContentText("Projekt v1.0.0\n(C) 2026");
    nevjegy.setHeaderText(null);

    // Title icon 
    ((Stage)nevjegy.getDialogPane().getScene().getWindow()).getIcons().add(new Image(getClass().getResourceAsStream("icons/icon.png")));

    // Image
    nevjegy.setGraphic(new ImageView(new Image(getClass().getResourceAsStream("icons/icon.png"))));

    nevjegy.showAndWait();
}
```

## Filebekérés
```
@FXML private void handleFileOpener() {

   Stage currentStage = (Stage) container.getScene().getWindow();

   try {
       FileChooser fileChooser = new FileChooser();
       fileChooser.setTitle("Fálj kiválasztása...");
       fileChooser.getExtensionFilters().addAll(new FileChooser.ExtensionFilter("CSV fájl", "*.csv"));
       File selectedFile = fileChooser.showOpenDialog(currentStage);

       if (selectedFile != null) visits = LoadFromCSV.loadFromCSV(selectedFile);
       else visits = LoadFromCSV.loadFromCSV(new File("TODO.csv"));

      // TODO
   } catch (Exception e) {
       throw new RuntimeException(e);
   }
}
```