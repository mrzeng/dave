package org.modzila.dave.bo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.testng.AbstractTestNGSpringContextTests;
import org.testng.annotations.Test;

@ContextConfiguration(locations = {"classpath:spring/applicationContext.xml"})
public class KettleQueryBoTest extends AbstractTestNGSpringContextTests {

    @Test
    public void testQuery() throws Exception {
        String filename = getClass().getResource("/data/Generate Row - basics.ktr").getFile();
        kettleQueryBo.query(filename, null);
    }

    @Test
    public void testQuery1() throws Exception {
        String filename = getClass().getResource("/data/quality view.ktr").getFile();
        kettleQueryBo.query(filename, null);
    }

    public KettleQueryBoTest() {
        kettleQueryBo = new KettleQueryBo();
    }

    @Autowired
    private final KettleQueryBo kettleQueryBo;
}
