package org.modzila.dave.dao;

import java.util.List;
import org.modzila.dave.model.DashBoard;

public interface DashBoardDao {
    
    public DashBoard load(String path) throws Exception;
    public List<DashBoard> list(int startId, int endId) throws Exception;
    public void add(DashBoard dashboard) throws Exception;
    public void dump(DashBoard dashboard, String path) throws Exception;
}
