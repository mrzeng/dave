package org.modzila.dave.dao;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import org.modzila.dave.model.UIWidget;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 *
 * @author yanshuai
 */
@Component("UIWidgetDao")
public class UIWidgetLocalDaoImpl implements UIWidgetDao {

    @Autowired
    private String tplHome;

    public List<UIWidget> list() throws IOException {
        List<UIWidget> uiWidgets = new ArrayList<UIWidget>();
        File uiWidgetHome = new File(tplHome, "ui-widget");
        for (File f : uiWidgetHome.listFiles()) {
            UIWidget uiWidget = UIWidget.loadFrom(f);
            uiWidgets.add(uiWidget);
        }
        return uiWidgets;
    }
}
