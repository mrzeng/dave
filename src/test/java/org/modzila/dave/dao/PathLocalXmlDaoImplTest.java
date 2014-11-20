package org.modzila.dave.dao;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.testng.AbstractTestNGSpringContextTests;
import static org.testng.Assert.*;
import org.testng.annotations.Test;

@ContextConfiguration(locations = {"classpath:spring/applicationContext-test.xml"})
public class PathLocalXmlDaoImplTest extends AbstractTestNGSpringContextTests {

    @Test
    public void testGetRoot() throws Exception {
        assertEquals("modzila", pathDao.getRoot());
    }

    @Test
    public void testGetSubpath() throws Exception {
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
        String[] pathItems = pathDao.splitPaths("/modzila/jspringbot/jspringbot-selenium");
        String[] expected = {"modzila", "jspringbot", "jspringbot-selenium"};
        assertEquals(pathItems.length, expected.length);
        for (int i = 0; i < expected.length; ++i) {
            assertEquals(pathItems[i], expected[i]);
        }
    }

    @Autowired
    private PathLocalXmlDaoImpl pathDao;
}
