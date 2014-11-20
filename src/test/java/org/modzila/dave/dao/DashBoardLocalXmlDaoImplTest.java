package org.modzila.dave.dao;

import java.io.File;
import java.util.Date;
import org.modzila.dave.model.DashBoard;
import org.modzila.dave.model.WidgetLayout;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.testng.AbstractTestNGSpringContextTests;
import static org.testng.Assert.*;
import org.testng.annotations.Test;

@ContextConfiguration(locations = {"classpath:spring/applicationContext-test.xml"})
public class DashBoardLocalXmlDaoImplTest extends AbstractTestNGSpringContextTests {

    @Test
    public void testLoad() throws Exception {
        DashBoard dashboard = dao.load("dashboard");
        assertEquals(dashboard.getId(), "123");
        assertEquals(dashboard.getWidgetCount(), 2);
        List<WidgetLayout> layouts = dashboard.getWidgets();
        assertEquals(layouts.get(0).getId(), "widget-001");
        assertEquals(layouts.get(0).getType(), "table");
        assertEquals(layouts.get(0).getWidth(), "col-md-12");
        assertEquals(layouts.get(1).getId(), "widget-002");
        assertEquals(layouts.get(1).getType(), "chart");
        assertEquals(layouts.get(1).getWidth(), "col-md-6");
    }

    @Test
    public void testDump() throws Exception {
        DashBoard dashboard = new DashBoard();
        dashboard.setId("finance");
        dashboard.setName("财务报表");
        dashboard.setDescription("各部门财务报表");
        dashboard.setDate(new Date());
        dashboard.setCategory("财务");
        dashboard.addWidget("widget-001", "col-md-12", "table");
        dashboard.addWidget("widget-002", "col-md-6", "chart");
        dao.dump(dashboard, null);
    }

    @Autowired
    private DashBoardLocalXmlDaoImpl dao;
}
