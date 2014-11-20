package org.modzila.dave.model;

import java.beans.PropertyEditorSupport;
import java.io.IOException;
import org.codehaus.jackson.map.ObjectMapper;

public class TableWidgetEditor extends PropertyEditorSupport {

    private final ObjectMapper objMapper = new ObjectMapper();

    @Override
    public void setAsText(String text) throws IllegalArgumentException {
        try {
            setValue(objMapper.readValue(text, TableWidget.class));
        } catch (IOException ex) {
            throw new IllegalArgumentException(ex.getMessage());
        }
    }

    @Override
    public String getAsText() {
        try {
            return objMapper.writeValueAsString(getValue());
        } catch (IOException ex) {
            return null;
        }
    }
}
