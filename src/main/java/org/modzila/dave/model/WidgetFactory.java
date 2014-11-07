package org.modzila.dave.model;

public class WidgetFactory {

    public static Widget create(String type) {
        if ("table".equals(type)) {
            return new TableWidget();
        }
        if ("chart".equals(type)) {
            return new ChartWidget();
        }
        return null;
    }
}
