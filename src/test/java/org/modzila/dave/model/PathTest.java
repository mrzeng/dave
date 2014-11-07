package org.modzila.dave.model;

import com.thoughtworks.xstream.XStream;
import java.util.ArrayList;
import java.util.List;
import org.testng.annotations.Test;

public class PathTest {
    
    public PathTest() {
        String[] subpaths = {"jspringbot", "dave", "alex"};
        root = new Path();
        root.setName("modzila");
        List<Path> paths = new ArrayList<Path>();
        for (int i = 0; i < 3; ++i) {
            Path path = new Path();
            path.setName(subpaths[i]);
            paths.add(path);
        }
        root.setPaths(paths);
    }

    @Test
    public void testDump() {
        XStream xstream = new XStream();
        xstream.alias("path", Path.class);
        System.out.println(xstream.toXML(root));
    }

    private final Path root;
}
