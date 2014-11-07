package org.modzila.dave.model;

import java.util.LinkedList;
import java.util.List;

public class DashBoard {

    private final LinkedList<WidgetLayout> widgets;

    public DashBoard() {
        widgets = new LinkedList<WidgetLayout>();
    }

    public synchronized int getWidgetCount() {
        return widgets.size();
    }

    public synchronized List<WidgetLayout> getWidgets() {
        return widgets;
    }

    public synchronized void addWidget(String widgetId, String widgetWidth, String type) {
        widgets.add(new WidgetLayout(widgetId, widgetWidth, type));
    }

    public synchronized void updateWidget(String widgetId, String width) {
        for (WidgetLayout widget : widgets) {
            if (widgetId.equals(widget.getId())) {
                widget.setWidth(width);
                break;
            }
        }
    }

    public synchronized void removeWidget(String widgetId) {
        for (WidgetLayout widget : widgets) {
            if (widgetId.equals(widget.getId())) {
                widgets.remove(widget);
                break;
            }
        }
    }
}
