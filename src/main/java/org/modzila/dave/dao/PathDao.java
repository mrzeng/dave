package org.modzila.dave.dao;

import java.util.List;

public interface PathDao {

    public String getRoot() throws Exception;
    public List<String> getSubPath(String path) throws Exception;
}
