package org.example.muzeumlatogatasokgui;

import javafx.application.Platform;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.scene.control.Alert;
import javafx.scene.control.ListView;
import javafx.scene.control.RadioButton;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.stage.FileChooser;
import javafx.stage.Stage;

import java.io.File;
import java.text.Collator;
import java.util.ArrayList;
import java.util.Locale;

public class VisitController {

    public static ArrayList<Visit> visits = new ArrayList<>();

    @FXML public VBox container;
    @FXML public HBox radioButtonsContainer;
    @FXML public ListView<String> dataListView;
    @FXML public ListView<String> resultListView;
    @FXML public RadioButton citiesRadioButton;
    @FXML public RadioButton typesRadioButton;

    public static Collator collator = Collator.getInstance(new Locale("hu", "HU"));

    @FXML public void handleFileOpener() {
        Stage currentStage = (Stage) container.getScene().getWindow();

        try {
            FileChooser fileChooser = new FileChooser();
            fileChooser.setTitle("Fálj kiválasztása...");
            fileChooser.getExtensionFilters().addAll(new FileChooser.ExtensionFilter("CSV fájl", "*.csv"));
            File selectedFile = fileChooser.showOpenDialog(currentStage);

            if (selectedFile != null) {
                visits = LoadFromCSV.loadFromCSV(selectedFile);
                radioButtonsContainer.setDisable(false);
                citiesRadioButton.setSelected(true);
                showCities();
            }
        }
        catch (Exception e) {
            System.out.println(e);
        }
    }

    @FXML protected void handleExit() {
        Platform.exit();
    }

    @FXML protected void handleAbout () {
        Alert alert = new Alert(Alert.AlertType.INFORMATION);
        alert.setTitle("Névjegy");
        alert.setHeaderText("");
        alert.setContentText("Visit v1.0.0\n(C) Kandó");
        alert.showAndWait();
    }

    @FXML public void showCities() {
        resultListView.getItems().clear();
        ObservableList<String> citiesNames = FXCollections.observableList(new ArrayList<>());

        for (Visit visit : visits) {
            if (!citiesNames.contains(visit.getCity())) citiesNames.add(visit.getCity());
        }

        citiesNames.sort(collator);
        dataListView.setItems(citiesNames);
    }

    @FXML public void showTypes() {
        resultListView.getItems().clear();
        ObservableList<String> types = FXCollections.observableList(new ArrayList<>());

        for (Visit visit : visits) {
            if (!types.contains(visit.getType())) types.add(visit.getType());
        }

        types.sort(collator);
        dataListView.setItems(types);
    }

    @FXML public void handleShowDetails() {
        String data = dataListView.getSelectionModel().getSelectedItem();
        if (citiesRadioButton.isSelected()) handleShowCityResult(data);
        if (typesRadioButton.isSelected()) handleShowTypeResult(data);
    }

    @FXML public void handleShowCityResult(String city) {
        ObservableList<String> visitsObList = FXCollections.observableList(new ArrayList<>());

        for (Visit visit : visits) {
            if (visit.getCity().equalsIgnoreCase(city)) {
                String data = visit.getVisitName() + " | " + visit.getMuseumName() + " | " + visit.getType() + " | " + visit.getVisitTime() + " óra";
                visitsObList.add(data);
            }
        }

        resultListView.setItems(visitsObList);
    }

    @FXML public void handleShowTypeResult(String type) {
        ObservableList<String> visitsObList = FXCollections.observableList(new ArrayList<>());

        for (Visit visit : visits) {
            if (visit.getType().equalsIgnoreCase(type)) {
                String data = visit.getVisitName() + " | " + visit.getMuseumName() + " | " + visit.getCity() + " | " + visit.getVisitTime() + " óra";
                visitsObList.add(data);
            }
        }

        resultListView.setItems(visitsObList);
    }
}