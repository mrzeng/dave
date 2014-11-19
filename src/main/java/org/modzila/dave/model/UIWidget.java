package org.modzila.dave.model;

import java.io.File;
import java.io.IOException;
import org.apache.commons.io.FileUtils;

/**
 *
 * @author yanshuai
 */
public class UIWidget {

    private String name;
    private String tpl;

    public UIWidget() {
    }

    public UIWidget(String name, String tpl) {
        this.name = name;
        this.tpl = tpl;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setTpl(String tpl) {
        this.tpl = tpl;
    }

    public String getTpl() {
        return tpl;
    }

    public static UIWidget loadFrom(File f) throws IOException {
        UIWidget uiWidget = new UIWidget();
        uiWidget.setName(f.getName());
        uiWidget.setTpl(FileUtils.readFileToString(new File(f, "index.html")));
        return uiWidget;
    }
}
