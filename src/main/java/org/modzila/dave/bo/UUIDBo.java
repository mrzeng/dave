package org.modzila.dave.bo;

import java.util.UUID;

public class UUIDBo {

    public String getWidgetUUID() {
        UUID uuid = UUID.randomUUID();
        return String.format("widget-%s", uuid.toString());
    }

    public String getDashBoardUUID() {
        UUID uuid = UUID.randomUUID();
        return String.format("dashboard-%s", uuid.toString());
    }

    public String getDataSourceUUID() {
        UUID uuid = UUID.randomUUID();
        return String.format("datasource-%s", uuid.toString());
    }
}
