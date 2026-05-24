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
import java.util.List;
import java.util.Locale;

public class VisitController {

    @FXML private VBox container;
    @FXML private HBox radioButtonsContainer;
    @FXML private ListView<String> dataListView;
    @FXML private ListView<String> resultListView;
    @FXML private RadioButton citiesRadioButton;
    @FXML private RadioButton typesRadioButton;

    private static List<Visit> visits = new ArrayList<>();
    private static final Collator collator = Collator.getInstance(new Locale("hu", "HU"));

    @FXML private void handleFileOpener() {
        Stage currentStage = (Stage) container.getScene().getWindow();

        try {
            FileChooser fileChooser = new FileChooser();
            fileChooser.setTitle("Fálj kiválasztása...");
            fileChooser.getExtensionFilters().addAll(new FileChooser.ExtensionFilter("CSV fájl", "*.csv"));
            File selectedFile = fileChooser.showOpenDialog(currentStage);

            if (selectedFile != null) visits = LoadFromCSV.loadFromCSV(selectedFile);
            else visits = LoadFromCSV.loadFromCSV(new File("TODO.csv"));
            radioButtonsContainer.setDisable(false);
            citiesRadioButton.setSelected(true);
            showCities();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @FXML private void handleExit() {
        Platform.exit();
    }

    @FXML private void handleAbout () {
        Alert alert = new Alert(Alert.AlertType.INFORMATION);
        alert.setTitle("Névjegy");
        alert.setHeaderText("");
        alert.setContentText("Visit v1.0.0\n(C) Kandó");
        alert.showAndWait();
    }

    @FXML private void showCities() {
        resultListView.setItems(null);

        ObservableList<String> citiesNames = FXCollections.observableList(
                visits.stream()
                        .map(Visit::getCity)
                        .distinct()
                        .sorted(collator)
                        .toList()
        );

        dataListView.setItems(citiesNames);
    }

    @FXML private void showTypes() {
        resultListView.setItems(null);

        ObservableList<String> types = FXCollections.observableList(
                visits.stream()
                        .map(Visit::getType)
                        .distinct()
                        .sorted(collator)
                        .toList()
        );

        dataListView.setItems(types);
    }

    @FXML private void handleShowDetails() {
        String data = dataListView.getSelectionModel().getSelectedItem();
        if (citiesRadioButton.isSelected()) handleShowCityResult(data);
        if (typesRadioButton.isSelected()) handleShowTypeResult(data);
    }

    @FXML private void handleShowCityResult(String city) {
        ObservableList<String> visitsObList = FXCollections.observableList(
                visits.stream()
                        .filter(visit -> visit.getCity().equalsIgnoreCase(city))
                        .map(visit -> visit.getVisitName() + " | " + visit.getMuseumName() + " | " + visit.getType() + " | " + visit.getVisitTime() + " óra")
                        .toList()
        );

        resultListView.setItems(visitsObList);
    }

    @FXML private void handleShowTypeResult(String type) {
        ObservableList<String> visitsObList = FXCollections.observableList(
                visits.stream()
                        .filter(visit -> visit.getType().equalsIgnoreCase(type))
                        .map(visit -> visit.getVisitName() + " | " + visit.getMuseumName() + " | " + visit.getCity() + " | " + visit.getVisitTime() + " óra")
                        .toList()
        );

        resultListView.setItems(visitsObList);
    }
}