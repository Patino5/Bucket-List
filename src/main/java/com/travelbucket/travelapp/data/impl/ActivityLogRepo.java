package com.travelbucket.travelapp.data.impl;

import com.travelbucket.travelapp.data.ActivityLogRepository;
import com.travelbucket.travelapp.data.mappers.ActivityLogRowMapper;
import com.travelbucket.travelapp.model.ActivityLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public class ActivityLogRepo implements ActivityLogRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Autowired
    ActivityLogRowMapper activityLogRowMapper;

    @Override
    public List<ActivityLog> getAll() {
        String sql = "SELECT * FROM ActivityLog";
        return jdbcTemplate.query(sql, activityLogRowMapper);
    }

    @Override
    public ActivityLog getById(int memoryID) {
        String sql = "SELECT * FROM ActivityLog Where memoryID = ?;";
        return jdbcTemplate.queryForObject(sql, activityLogRowMapper, memoryID);
    }

    @Override
    public ActivityLog add(ActivityLog activityLog) {
        String sql = "INSERT INTO ActivityLog (activityID, createdAt, notes, photoURL) VALUES (? ,?, ?, ?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, activityLog.getActivityID());

            if (activityLog.getCreatedAt() != null) {
                ps.setTimestamp(2, Timestamp.valueOf(activityLog.getCreatedAt()));
            } else {
                ps.setTimestamp(2, Timestamp.valueOf(LocalDateTime.now()));
            }

            ps.setString(3, activityLog.getNotes());
            ps.setString(4, activityLog.getPhotoURL());

            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        activityLog.setMemoryID(keyHolder.getKey().intValue());
        return activityLog;
    }

    @Override
    public ActivityLog update(ActivityLog activityLog) {
        String sql = "UPDATE ActivityLog SET notes = ?, photoURL = ?, WHERE memoryID = ?";

        int rows = jdbcTemplate.update(sql,
                activityLog.getNotes(),
                activityLog.getPhotoURL(),
                activityLog.getMemoryID()
        );

        return rows > 0 ? activityLog : null;
    }

    @Override
    public boolean delete(int memoryID) {
        String sql = "DELETE FROM ActivityLog WHERE memoryID = ?;";
        return jdbcTemplate.update(sql, memoryID) > 0;
    }
}
