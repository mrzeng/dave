package org.modzila.dave.dao;

import org.testng.annotations.Test;
import static org.testng.Assert.*;

public class PathMySQLDaoImplTest {

    @Test
    public void testGetRoot() throws Exception {
        assertEquals(pathDao.getRoot(), "modzila");
    }

    @Test
    public void test() throws Exception {
        assertEquals(pathDao.getSubPath("/modzila").toString(), "[jspringbot, dave, alex]");
    }

    public PathMySQLDaoImplTest() {
        pathDao = new PathMySQLDaoImpl();
    }

    private final PathMySQLDaoImpl pathDao;
}
