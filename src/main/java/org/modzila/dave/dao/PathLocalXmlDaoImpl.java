package org.modzila.dave.dao;

import org.modzila.dave.model.Path;
import com.thoughtworks.xstream.XStream;
import java.io.File;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

@Component("pathLocalXmlDao")
public class PathLocalXmlDaoImpl implements PathDao {

    @Autowired
    @Qualifier("teamPath")
    private String teamPath;

    public PathLocalXmlDaoImpl() {
        xstream = new XStream();
        xstream.alias("path", Path.class);
    }

    public void setTeamPath(String teamPath) {
        this.teamPath = teamPath;
    }

    public String getRoot() throws Exception {
        File xml = new File(teamPath);
        Path root = (Path) xstream.fromXML(xml);
        return root.getName();
    }

    public List<String> getSubPath(String path) throws Exception {
        File xml = new File(teamPath);
        Path node = (Path) xstream.fromXML(xml);
        String[] paths = splitPaths(path);
        if (0 == paths.length || !node.getName().equals(paths[0])) {
            return null;
        }
        return getSubPath(node, paths, 1);
    }

    /**
     * @Param node current node
     * @Param paths xpath
     * @Param id 
     */
    List<String> getSubPath(Path node, String[] paths, int id) {
        if (id == paths.length) {
            List<String> al = new ArrayList<String>();
            List<Path> subpath = node.getPaths();
            if (null == subpath) {
                return null;
            }
            for (int j = 0; j < subpath.size(); ++j) {
                al.add(subpath.get(j).getName());
            }
            return al;
        }

        String p = paths[id];
        List<Path> subpath = node.getPaths();
        int j;
        for (j = 0; j < subpath.size(); ++j) {
            if (subpath.get(j).getName().equals(paths[id])) {
                node = subpath.get(j);
                break;
            }
        }
        if (j != subpath.size()) {
            return getSubPath(node, paths, id + 1);
        } else {
            return null;
        }
    }

    String[] splitPaths(String path) {
        String[] pathItems = path.split("/");
        List<String> al = new ArrayList<String>();
        for (String pathItem : pathItems) {
            if (!pathItem.isEmpty()) {
                al.add(pathItem);
            }
        }
        return al.toArray(new String[0]);
    }

    private final XStream xstream;
}
