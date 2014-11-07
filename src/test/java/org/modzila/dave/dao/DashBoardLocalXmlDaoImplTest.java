package org.modzila.dave.dao;

import org.modzila.dave.model.DashBoard;
import org.modzila.dave.model.WidgetLayout;
import java.util.List;
import static org.testng.Assert.*;
import org.testng.annotations.Test;

public class DashBoardLocalXmlDaoImplTest {

    @Test
    public void testLoad() throws Exception {
        DashBoard dashboard = dao.load("dashboard");
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
        dashboard.addWidget("widget-001", "col-md-12", "table");
        dashboard.addWidget("widget-002", "col-md-6", "chart");
        dao.dump(dashboard, null);
    }

    public DashBoardLocalXmlDaoImplTest() {
        dao = new DashBoardLocalXmlDaoImpl();
        dao.setDashboardHome(getClass().getResource("/data").getFile());
    }

    private final DashBoardLocalXmlDaoImpl dao;
}
