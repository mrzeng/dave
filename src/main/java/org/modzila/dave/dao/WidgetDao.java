package org.modzila.dave.dao;

import org.modzila.dave.model.Widget;

public interface WidgetDao {

    public Widget load(String id) throws Exception;
    public void remove(String id) throws Exception;
    public void dump(Widget widget, String path) throws Exception;
}
