package org.modzila.dave;

import java.io.File;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;

/**
 *
 * @author yanshuai
 */
public class ConfigurationBean {

    @Autowired
    private ApplicationContext ctx;

    private File f;

    public ConfigurationBean() {
    }

    public ConfigurationBean(String dataDir) {
        this.f = new File(getClass().getResource(dataDir).getFile());
    }

    private File getDataFile() throws IOException {
        if (null != f) {
            return f;
        }
        return ctx.getResource("/data").getFile();
    }

    public String getDashboardHome() throws IOException {
        return new File(getDataFile(), "dashboard").getAbsolutePath();
    }

    public String getWidgetHome() throws IOException {
        return new File(getDataFile(), "widget").getAbsolutePath();
    }

    public String getTeamPath() throws IOException {
        return new File(getDataFile(), "path.xml").getAbsolutePath();
    }

    public String getKettleHome() throws IOException {
        return new File(getDataFile(), "datasource").getAbsolutePath();
    }

    public String getTemplateHome() throws IOException {
        return new File(getDataFile(), "template").getAbsolutePath();
    }
}
