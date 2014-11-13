package org.modzila.dave.dao;

import com.thoughtworks.xstream.XStream;
import org.modzila.dave.model.DashBoard;
import org.modzila.dave.model.WidgetLayout;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

@Component("dashboardLocalXmlDao")
public class DashBoardLocalXmlDaoImpl implements DashBoardDao {

    @Autowired
    @Qualifier("dashboardHome")
    private String dashboardHome;

    public DashBoardLocalXmlDaoImpl() {
        xstream = new XStream();
        xstream.alias("dashboard", DashBoard.class);
        xstream.alias("widget", WidgetLayout.class);
    }

    public void setDashboardHome(String dashboardHome) {
        this.dashboardHome = dashboardHome;
    }

    public List<DashBoard> list(int startId, int endId) throws IOException {
        List<DashBoard> dashboards = new ArrayList<DashBoard>();
        File dir = new File(dashboardHome);
        File[] files = dir.listFiles();
        for (int i = startId - 1; i < endId && i < files.length; ++i) {
            File file = files[i];
            dashboards.add(load(file));
        }
        return dashboards;
    }
 
    public void add(DashBoard dashboard) throws IOException {
        dump(dashboard, dashboard.getName());
    }

    public DashBoard load(String path) {
        File xml = new File(dashboardHome, String.format("%s.xml", path));
        return load(xml);
    }

    DashBoard load(File xml) {
        if (xml.isFile()) {
            DashBoard dashboard = (DashBoard) xstream.fromXML(xml);
            return dashboard;
        }
        return null;
    }

    public void dump(DashBoard dashboard, String path) throws IOException {
        if (null == path) {
            String xml = xstream.toXML(dashboard);
            System.out.println(xml);
        } else {
            File xmlPath = new File(dashboardHome, String.format("%s.xml", path));
            OutputStream os = null;
            try {
                os = new FileOutputStream(xmlPath);
                xstream.toXML(dashboard, os);
            } finally {
                if (null != os) {
                    os.close();
                }
            }
        }
    }

    private final XStream xstream;
}
