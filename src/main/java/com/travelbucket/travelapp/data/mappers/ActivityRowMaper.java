package com.travelbucket.travelapp.data.mappers;

import com.travelbucket.travelapp.model.Activity;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;

@Component
public class ActivityRowMaper implements RowMapper<Activity> {
    @Override
    public Activity mapRow(ResultSet rs, int rowNum) throws SQLException {
        Activity activity = new Activity();
        activity.setActivityID(rs.getInt("activityID"));
        activity.setDestinationID(rs.getInt("destinationID"));
        activity.setCategoryID(rs.getInt("categoryID"));
        activity.setTitle(rs.getString("title"));
        activity.setActivityDescription(rs.getString("activityDescription"));
        activity.setWebsite(rs.getString("website"));
        activity.setCompleted(rs.getBoolean("isCompleted"));

        return activity;
    }
}
