package org.modzila.dave.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

/**
 *
 * @author yanshuai
 */
public class DashBoardList {

    private List<DashBoard> dashboards;
    private int iTotalRecords;

    public DashBoardList(List<DashBoard> dashboards, int iTotalRecords) {
        this.dashboards = dashboards;
        this.iTotalRecords = iTotalRecords;
    }

    public void setDashboards(List<DashBoard> dashboards) {
        this.dashboards = dashboards;
    }

    public List<DashBoard> getDashboards() {
        return dashboards;
    }

    @JsonProperty("iTotalRecords")
    public int getITotalRecords() {
        return iTotalRecords;
    }

    public void setITotalRecords(int iTotalRecords) {
        this.iTotalRecords = iTotalRecords;
    }
}
