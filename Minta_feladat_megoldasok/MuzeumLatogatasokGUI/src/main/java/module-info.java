module org.example.muzeumlatogatasokgui {
    requires javafx.controls;
    requires javafx.fxml;


    opens org.example.muzeumlatogatasokgui to javafx.fxml;
    exports org.example.muzeumlatogatasokgui;
}