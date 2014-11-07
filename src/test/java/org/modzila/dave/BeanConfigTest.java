package org.modzila.dave;

import org.modzila.dave.dao.PathDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.testng.AbstractTestNGSpringContextTests;
import static org.testng.Assert.*;
import org.testng.annotations.Test;

@ContextConfiguration(locations = {"classpath*:applicationContext.xml"})
public class BeanConfigTest extends AbstractTestNGSpringContextTests {

    @Test
    public void testDashboardHomeBeanConfig() {
        assertEquals(dashboardHome, "data/dashboard");
    }

    @Test
    public void testWidgetHomeBeanConfig() {
        assertEquals(widgetHome, "data/widget");
    }

    @Test
    public void testTeamPathBeanConfig() {
        assertEquals(teamPath, "data/path.xml");
    }

    @Test
    public void testPathLocalXmlDao() {
        assertNotNull(pathLocalXmlDao);
    }

    @Autowired
    @Qualifier("dashboardHome")
    private String dashboardHome;

    @Autowired
    @Qualifier("widgetHome")
    private String widgetHome;

    @Autowired
    @Qualifier("teamPath")
    private String teamPath;

    @Autowired
    @Qualifier("pathLocalXmlDao")
    private PathDao pathLocalXmlDao;
}
