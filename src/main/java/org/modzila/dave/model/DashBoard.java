package org.modzila.dave.model;

import java.util.Date;
import java.util.LinkedList;
import java.util.List;

public class DashBoard {

    private String name;
    private Date date;
    private String category;
    private String description;
    private final LinkedList<WidgetLayout> widgets;

    public DashBoard() {
        widgets = new LinkedList<WidgetLayout>();
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Date getDate() {
        return date;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getCategory() {
        return category;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
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
