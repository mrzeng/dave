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

    public String getDashboardHome() throws IOException {
        return new File(ctx.getResource("/data").getFile(),
                "dashboard").getAbsolutePath();
    }

    public String getWidgetHome() throws IOException {
        return new File(ctx.getResource("/data").getFile(),
                "widget").getAbsolutePath();
    }

    public String getTeamPath() throws IOException {
        return new File(ctx.getResource("/data").getFile(),
                "path.xml").getAbsolutePath();
    }

    public String getKettleHome() throws IOException {
        return new File(ctx.getResource("/data").getFile(),
                "datasource").getAbsolutePath();
    }

    public String getTemplateHome() throws IOException {
        return new File(ctx.getResource("/data").getFile(),
                "template").getAbsolutePath();
    }
}
