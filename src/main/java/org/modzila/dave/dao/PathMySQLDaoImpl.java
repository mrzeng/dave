package org.modzila.dave.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.datasource.SimpleDriverDataSource;
import org.springframework.stereotype.Component;

@Component("pathMySQLDao")
public class PathMySQLDaoImpl implements PathDao {

    public PathMySQLDaoImpl() {
        SimpleDriverDataSource dataSource = new SimpleDriverDataSource();
        dataSource.setDriverClass(com.mysql.jdbc.Driver.class);
        dataSource.setUrl(String.format("jdbc:mysql://%s:%d", hostname, port));
        dataSource.setUsername(username);
        dataSource.setPassword(password);
        jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public String getRoot() {
        return jdbcTemplate.query(sql_query_root, new RowMapper<String>() {
            @Override
            public String mapRow(ResultSet rs, int rowNum) throws SQLException {
                return rs.getString(1);
            }
        }).get(0);
    }

    public List<String> getSubPath(final String fullpath) {
        return jdbcTemplate.query(
                new PreparedStatementCreator() {
                    public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {
                        PreparedStatement ps = connection.prepareStatement(sql_query_sub_path);
                        ps.setString(1, fullpath);
                        return ps;
                    }
                },
                new RowMapper<String>() {
                    @Override
                    public String mapRow(ResultSet rs, int rowNum) throws SQLException {
                        return rs.getString(1);
                    }
        });
    }
 
    private static final String hostname = "192.168.14.189";
    private static final int port = 3306;
    private static final String username = "root";
    private static final String password = "root";
    private static final String sql_query_root = "SELECT `name` FROM `CIDataRest`.`team` WHERE `pid` = 0";
    private static final String sql_query_sub_path = "SELECT `name` FROM `CIDataRest`.`team` WHERE `pid` in (SELECT `id` FROM `CIDataRest`.`team` WHERE `fullpath` = ? ORDER BY `id`)";
    private final JdbcTemplate jdbcTemplate;
}
