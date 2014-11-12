package org.modzila.dave.dao;

import org.modzila.dave.model.DashBoard;

public interface DashBoardDao {
    
    public DashBoard load(String path) throws Exception;
    public void add(DashBoard dashboard) throws Exception;
    public void dump(DashBoard dashboard, String path) throws Exception;
}
