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