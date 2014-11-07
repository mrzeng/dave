package org.modzila.dave.dao;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.testng.AbstractTestNGSpringContextTests;
import static org.testng.Assert.*;
import org.testng.annotations.Test;

@ContextConfiguration(locations = {"classpath*:applicationContext.xml"})
public class PathLocalXmlDaoImplTest extends AbstractTestNGSpringContextTests {

    @Test
    public void testGetRoot() throws Exception {
        initTeamPath();
        assertEquals("modzila", pathDao.getRoot());
    }

    @Test
    public void testGetSubpath() throws Exception {
        initTeamPath();
        List<String> subpaths = pathDao.getSubPath("/modzila");
        assertEquals("[jspringbot, dave, alex]", subpaths.toString());
        subpaths = pathDao.getSubPath("/modzila/jspringbot");
        assertEquals("[jspringbot-selenium]", subpaths.toString());
        subpaths = pathDao.getSubPath("/modzila/dave");
        assertNull(subpaths);
        subpaths = pathDao.getSubPath("/modzila/alex");
        assertNull(subpaths);
    }

    @Test
    public void testSplitPaths() {
        initTeamPath();
        String[] pathItems = pathDao.splitPaths("/modzila/jspringbot/jspringbot-selenium");
        String[] expected = {"modzila", "jspringbot", "jspringbot-selenium"};
        assertEquals(pathItems.length, expected.length);
        for (int i = 0; i < expected.length; ++i) {
            assertEquals(pathItems[i], expected[i]);
        }
    }

    public void initTeamPath() {
        String teamPath = getClass().getResource("/data/path.xml").getFile();
        pathDao.setTeamPath(teamPath);
    }

    @Autowired
    @Qualifier("pathLocalXmlDao")
    private PathLocalXmlDaoImpl pathDao;
}
