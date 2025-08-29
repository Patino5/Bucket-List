package com.travelbucket.travelapp.data.impl;

import com.travelbucket.travelapp.data.ActivityLogRepository;
import com.travelbucket.travelapp.data.mappers.ActivityLogRowMapper;
import com.travelbucket.travelapp.model.ActivityLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

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
    public List<ActivityLog> getUserLogs(int userID) {
        SimpleJdbcCall call = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("GetActivityLogsByUser")
                .returningResultSet("logs", activityLogRowMapper);

        Map<String, Object> result = call.execute(Map.of("p_userID", userID));

        return (List<ActivityLog>) result.get("logs");
    }

    @Override
    public ActivityLog getById(int memoryID) {
        String sql = "SELECT * FROM ActivityLog WHERE memoryID = ?";
        return jdbcTemplate.queryForObject(sql, activityLogRowMapper, memoryID);
    }

    // New method to get logs by activityID for the REST API
    public List<ActivityLog> getByActivityId(int activityID) {
        String sql = "SELECT * FROM ActivityLog WHERE activityID = ? ORDER BY createdAt DESC";
        return jdbcTemplate.query(sql, activityLogRowMapper, activityID);
    }

    @Override
    public ActivityLog add(ActivityLog activityLog) {
        String sql = "INSERT INTO ActivityLog (activityID, createdAt, notes, photo, photoMimeType, photoFileName) VALUES (?, ?, ?, ?, ?, ?)";

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

            // Handle BLOB image data
            if (activityLog.getPhoto() != null) {
                ps.setBytes(4, activityLog.getPhoto());
            } else {
                ps.setNull(4, java.sql.Types.BLOB);
            }

            // Handle photo metadata
            ps.setString(5, activityLog.getPhotoMimeType());
            ps.setString(6, activityLog.getPhotoFileName());

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
        String sql = "UPDATE ActivityLog SET notes = ?, photo = ?, photoMimeType = ?, photoFileName = ? WHERE memoryID = ?";

        int rows = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql);
            ps.setString(1, activityLog.getNotes());

            // Handle BLOB image data - explicitly handle null
            if (activityLog.getPhoto() != null && activityLog.getPhoto().length > 0) {
                ps.setBytes(2, activityLog.getPhoto());
            } else {
                ps.setNull(2, java.sql.Types.BLOB);
            }

            if (activityLog.getPhotoMimeType() != null && !activityLog.getPhotoMimeType().trim().isEmpty()) {
                ps.setString(3, activityLog.getPhotoMimeType());
            } else {
                ps.setNull(3, java.sql.Types.VARCHAR);
            }

            if (activityLog.getPhotoFileName() != null && !activityLog.getPhotoFileName().trim().isEmpty()) {
                ps.setString(4, activityLog.getPhotoFileName());
            } else {
                ps.setNull(4, java.sql.Types.VARCHAR);
            }

            ps.setInt(5, activityLog.getMemoryID());

            return ps;
        });

        return rows > 0 ? activityLog : null;
    }

    @Override
    public boolean delete(int memoryID) {
        String sql = "DELETE FROM ActivityLog WHERE memoryID = ?";
        return jdbcTemplate.update(sql, memoryID) > 0;
    }

}
