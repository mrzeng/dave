package org.modzila.dave.model;

import com.thoughtworks.xstream.XStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import junit.framework.Assert;
import org.apache.commons.io.IOUtils;
import org.testng.annotations.Test;

public class PathTest {
    
    public PathTest() {
        root = new Path();
        root.setName("modzila");
        String[] subpaths = {"jspringbot", "dave", "alex"};
        List<Path> paths = new ArrayList<Path>();
        for (int i = 0; i < 3; ++i) {
            Path p1 = new Path();
            p1.setName(subpaths[i]);
            paths.add(p1);
        }
        root.setPaths(paths);
        Path p2 = new Path();
        p2.setName("jspringbot-selenium");
        Path path = paths.get(0);
        paths = new ArrayList<Path>();
        paths.add(p2);
        path.setPaths(paths);
    }

    @Test
    public void testDump() throws IOException {
        XStream xstream = new XStream();
        xstream.alias("path", Path.class);
        String xml = xstream.toXML(root);
        InputStream in = null;
        String content = null;
        try {
            in = getClass().getResourceAsStream("/data/path.xml");
            content = IOUtils.toString(in);
        } finally {
            IOUtils.closeQuietly(in);
        }
        Assert.assertNotNull(content);
        Assert.assertEquals(xml.trim(), content.trim());
    }

    private final Path root;
}
