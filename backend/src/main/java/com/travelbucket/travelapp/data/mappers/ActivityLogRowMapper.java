package com.travelbucket.travelapp.data.mappers;

import com.travelbucket.travelapp.model.ActivityLog;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;

@Component
public class ActivityLogRowMapper implements RowMapper<ActivityLog> {
    @Override
    public ActivityLog mapRow(ResultSet rs, int rowNum) throws SQLException {
        ActivityLog activityLog = new ActivityLog();
        activityLog.setMemoryID(rs.getInt("memoryID"));
        activityLog.setActivityID(rs.getInt("activityID"));
        activityLog.setCreatedAt(rs.getTimestamp("createdAt").toLocalDateTime());
        activityLog.setNotes(rs.getString("notes"));

        // Handle BLOB image data
        byte[] photoBytes = rs.getBytes("photo");
        activityLog.setPhoto(photoBytes);

        // Handle photo metadata
        activityLog.setPhotoMimeType(rs.getString("photoMimeType"));
        activityLog.setPhotoFileName(rs.getString("photoFileName"));

        return activityLog;
    }
}
