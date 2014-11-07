package org.modzila.dave.model;

public class WidgetLayout {

    private String id;
    private String type;
    private String width;

    public WidgetLayout(String id, String width, String type) {
        this.id = id;
        this.type = type;
        this.width = width;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getWidth() {
        return width;
    }

    public void setWidth(String width) {
        this.width = width;
    }
}
