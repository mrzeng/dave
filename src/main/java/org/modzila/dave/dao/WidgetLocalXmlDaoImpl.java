package org.modzila.dave.dao;

import com.thoughtworks.xstream.XStream;
import org.modzila.dave.model.ChartWidget;
import org.modzila.dave.model.TableWidget;
import org.modzila.dave.model.Widget;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import org.modzila.dave.ConfigurationBean;
import org.springframework.beans.factory.annotation.Autowired;

public class WidgetLocalXmlDaoImpl implements WidgetDao {

    @Autowired
    private ConfigurationBean config;
    
    public WidgetLocalXmlDaoImpl() {
        xstream = new XStream();
        xstream.alias("table", TableWidget.class);
        xstream.alias("chart", ChartWidget.class);
    }

    public synchronized Widget load(String path) throws IOException {
        File xml = new File(config.getWidgetHome(), String.format("%s.xml", path));
        if (xml.isFile()) {
            Widget widget = (Widget) xstream.fromXML(xml);
            return widget;
        }
        return new Widget();
    }

    public synchronized void dump(Widget widget, String path) throws IOException {
        if (null == path) {
            String xml = xstream.toXML(widget);
            System.out.println(xml);
        } else {
            File xmlPath = new File(config.getWidgetHome(), String.format("%s.xml", path));
            OutputStream os = null;
            try {
                os = new FileOutputStream(xmlPath);
                xstream.toXML(widget, os);
            } finally {
                if (null != os) {
                    os.close();
                }
            }
        }
    }

    public synchronized void remove(String id) throws Exception {
        File xml = new File(config.getWidgetHome(), String.format("%s.xml", id));
        xml.delete();
    }

    private final XStream xstream;
}
