package org.modzila.dave.dao;

import com.thoughtworks.xstream.XStream;
import org.modzila.dave.model.DashBoard;
import org.modzila.dave.model.WidgetLayout;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
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

    public DashBoard load(String path) {
        File xml = new File(dashboardHome, String.format("%s.xml", path));
        if (xml.isFile()) {
            DashBoard dashboard = (DashBoard) xstream.fromXML(xml);
            return dashboard;
        }
        return new DashBoard();
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
