package org.modzila.dave.dao;

import org.modzila.dave.model.DashBoard;
import org.modzila.dave.model.DashBoardList;

public interface DashBoardDao {

    public DashBoard load(int index) throws Exception;
    public void delete(String path) throws Exception;
    public DashBoard load(String path) throws Exception;
    public DashBoardList list(int iDisplayStart, int iDisplayLength) throws Exception;
    public void add(DashBoard dashboard) throws Exception;
    public void dump(DashBoard dashboard, String path) throws Exception;
}
