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
import org.modzila.dave.ConfigurationBean;
import org.modzila.dave.model.DashBoardList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

public class DashBoardLocalXmlDaoImpl implements DashBoardDao {

    @Autowired
    private ConfigurationBean config;

    public DashBoardLocalXmlDaoImpl() {
        xstream = new XStream();
        xstream.alias("dashboard", DashBoard.class);
        xstream.alias("widget", WidgetLayout.class);
    }

    public DashBoardList list(int iDisplayStart, int iDisplayLength) throws IOException {
        List<DashBoard> dashboards = new ArrayList<DashBoard>();
        File dir = new File(config.getDashboardHome());
        File[] files = dir.listFiles();
        int iDisplayEnd = iDisplayStart - 1 + iDisplayLength;
        for (int i = iDisplayStart - 1; i < iDisplayEnd && i < files.length; ++i) {
            File file = files[i];
            DashBoard dashboard = load(file);
            if (null != dashboard) {
                dashboards.add(dashboard);
            }
        }
        return new DashBoardList(dashboards, files.length);
    }
 
    public DashBoard load(int index) throws Exception {
        File dir = new File(config.getDashboardHome());
        File[] files = dir.listFiles();
        if (index < files.length) {
            return load(files[index]);
        } else {
            return null;
        }
    }

    public void delete(String path) throws Exception {
        File xml = new File(config.getDashboardHome(), String.format("%s.xml", path));
        xml.delete();
    }

    public void add(DashBoard dashboard) throws IOException {
        dump(dashboard, dashboard.getId());
    }

    public DashBoard load(String path) throws IOException {
        File xml = new File(config.getDashboardHome(), String.format("%s.xml", path));
        return load(xml);
    }

    DashBoard load(File xml) {
        if (xml.isFile()) {
            try {
                DashBoard dashboard = (DashBoard) xstream.fromXML(xml);
                return dashboard;
            } catch (Exception ex) {
                LOG.error("Exception:", ex);
                return null;
            }
        }
        return null;
    }

    public void dump(DashBoard dashboard, String path) throws IOException {
        if (null == path) {
            String xml = xstream.toXML(dashboard);
            System.out.println(xml);
        } else {
            File xmlPath = new File(config.getDashboardHome(), String.format("%s.xml", path));
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
    private static final Logger LOG = LoggerFactory.getLogger(DashBoardLocalXmlDaoImpl.class);
}
