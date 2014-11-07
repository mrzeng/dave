package org.modzila.dave.model;

import java.util.List;

public class Path {

    private String name;
    private List<Path> paths;

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setPaths(List<Path> paths) {
        this.paths = paths;
    }

    public List<Path> getPaths() {
        return paths;
    }
}
