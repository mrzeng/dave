package org.modzila.dave.bo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.testng.AbstractTestNGSpringContextTests;
import org.testng.annotations.Test;

@ContextConfiguration(locations = {"classpath:spring/applicationContext-test.xml"})
public class KettleQueryBoTest extends AbstractTestNGSpringContextTests {

    @Test
    public void testBasicQuery() throws Exception {
        String filename = getClass().getResource("/data/datasource/Generate Row - basics.ktr").getFile();
        kettleQueryBo.query(filename, null);
    }

    public KettleQueryBoTest() {
        kettleQueryBo = new KettleQueryBo();
    }

    @Autowired
    private final KettleQueryBo kettleQueryBo;
}
