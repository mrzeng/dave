package org.modzila.dave.bo;

import java.sql.Driver;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.datasource.SimpleDriverDataSource;

public class DbQueryBo {

    public DbQueryBo() {
        properties = new Properties();
        properties.setProperty("autoReconnect", "true");
        properties.setProperty("maxReconnects", "3");
    }

    public Object[][] query(String datasource, String hostname, int port,
            String username, String password, String sql) {
        if (null == datasource || null == hostname
                || null == sql) {
            return null;
        }
        SimpleDriverDataSource dataSource = new SimpleDriverDataSource();
        dataSource.setConnectionProperties(properties);
        dataSource.setDriverClass(getDriverClassName(datasource));
        dataSource.setUrl(getUrl(datasource, hostname, port));
        dataSource.setUsername(username);
        dataSource.setPassword(password);
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        final List<String> columns = new ArrayList<String>();
        List<Object[]> objects = jdbcTemplate.query(sql, new RowMapper<Object[]>() {
            @Override
            public Object[] mapRow(ResultSet rs, int rowNum) throws SQLException {
                ResultSetMetaData metaData = rs.getMetaData();
                int cols = metaData.getColumnCount();
                if (0 == rowNum) {
                    for (int i = 1; i <= cols; ++i) {
                        columns.add(metaData.getColumnLabel(i));
                    }
                }
                Object[] objs = new Object[cols];
                for (int i = 1; i <= cols; ++i) {
                    objs[i - 1] = rs.getObject(i);
                }
                return objs;
            }
        });

        Object[][] results = new Object[objects.size() + 1][columns.size()];
        for (int i = 0; i < columns.size(); ++i) {
            results[0][i] = columns.get(i);
        }
        for (int i = 0; i < objects.size(); ++i) {
            for (int j = 0; j < objects.get(i).length; ++j) {
                results[i + 1][j] = objects.get(i)[j];
            }
        }
        return results;
    }

    private Class<? extends Driver> getDriverClassName(String datasource) {
        if ("MySQL".equals(datasource)) {
            return com.mysql.jdbc.Driver.class;
        } else if ("MSSQL".equals(datasource)) {
            return net.sourceforge.jtds.jdbc.Driver.class;
        } else {
            throw new IllegalArgumentException(String.format("不支持的数据源: %s", datasource));
        }
    }

    private String getUrl(String datasource, String hostname, int port) {
        if ("MySQL".equals(datasource)) {
            return String.format("jdbc:mysql://%s:%d", hostname, port);
        } else if ("MSSQL".equals(datasource)) {
            return String.format("jdbc:jtds:sqlserver://%s:%d", hostname, port);
        } else {
            throw new IllegalArgumentException(String.format("不支持的数据源: %s", datasource));
        }
    }

    private final Properties properties;
}
