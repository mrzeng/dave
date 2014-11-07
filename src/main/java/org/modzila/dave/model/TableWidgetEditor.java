package org.modzila.dave.model;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.beans.PropertyEditorSupport;
import java.io.IOException;

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
        } catch (JsonProcessingException ex) {
            return null;
        }
    }
}
