package org.modzila.dave.dao;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import org.modzila.dave.ConfigurationBean;
import org.modzila.dave.model.UIWidget;
import org.springframework.beans.factory.annotation.Autowired;

public class UIWidgetLocalDaoImpl implements UIWidgetDao {

    @Autowired
    private ConfigurationBean config;

    public List<UIWidget> list() throws IOException {
        List<UIWidget> uiWidgets = new ArrayList<UIWidget>();
        File uiWidgetHome = new File(config.getTemplateHome(), "ui-widget");
        for (File f : uiWidgetHome.listFiles()) {
            UIWidget uiWidget = UIWidget.loadFrom(f);
            uiWidgets.add(uiWidget);
        }
        return uiWidgets;
    }
}
