package org.modzila.dave.dao;

import org.modzila.dave.model.ChartWidget;
import org.modzila.dave.model.TableWidget;
import org.modzila.dave.model.Widget;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.testng.AbstractTestNGSpringContextTests;
import static org.testng.Assert.*;
import org.testng.annotations.Test;

@ContextConfiguration(locations = {"classpath:spring/applicationContext-test.xml"})
public class WidgetLocalXmlDaoImplTest extends AbstractTestNGSpringContextTests {

    @Test
    public void testLoad() throws Exception {
        Widget widget = dao.load("widget-001");
        assertEquals(widget.getId(), "widget-001");
        assertEquals(widget.getName(), "质量总览");
        assertEquals(widget.getDescription(), "项目质量总览");
        assertEquals(widget.getDatasource(), "mysql");
        assertEquals(widget.getHostname(), "192.168.14.189");
        assertEquals(widget.getPort(), 3306);
        assertEquals(widget.getUsername(), "root");
        assertEquals(widget.getPassword(), "root");
        assertEquals(widget.getSql(), "select 1");
    }

    @Test
    public void testDumpTableWidget() throws Exception {
        TableWidget widget = new TableWidget();
        widget.setId("widget-001");
        widget.setName("质量总览");
        widget.setDescription("项目质量总览");
        widget.setDatasource("mysql");
        widget.setHostname("192.168.14.189");
        widget.setPort(3306);
        widget.setUsername("root");
        widget.setPassword("root");
        widget.setSql("select 1");
        dao.dump(widget, null);
    }

    @Test
    public void testDumpChartWidget() throws Exception {
        ChartWidget widget = new ChartWidget();
        widget.setId("widget-002");
        widget.setName("构建数");
        widget.setDescription("构建数");
        widget.setType("line");
        widget.setDatasource("mysql");
        widget.setHostname("192.168.14.189");
        widget.setPort(3306);
        widget.setUsername("root");
        widget.setPassword("root");
        widget.setSql("select 1");
        dao.dump(widget, null);
    }

    @Autowired
    private WidgetLocalXmlDaoImpl dao;    
}
