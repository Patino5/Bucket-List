package com.travelbucket.travelapp.data.impl;

import com.travelbucket.travelapp.data.ActivityRepository;
import com.travelbucket.travelapp.data.mappers.ActivityRowMaper;
import com.travelbucket.travelapp.model.Activity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.util.List;

@Repository
public class ActivityRepo implements ActivityRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private ActivityRowMaper activityRowMaper;

    @Override
    public List<Activity> getAll() {
        String sql = "SELECT * FROM Activity;";

        return jdbcTemplate.query(sql, activityRowMaper);
    }

    @Override
    public Activity getById(int activityID) {
        String sql = "SELECT * FROM Activity WHERE activityID = ?;";

        return jdbcTemplate.queryForObject(sql, activityRowMaper, activityID);
    }

    @Override
    public List<Activity> getAllByDestinationId(int destinationID) {
        String sql = "SELECT * FROM Activity WHERE destinationID = ?;";

        return jdbcTemplate.query(sql, activityRowMaper, destinationID);
    }

    @Override
    public Activity add(Activity activity) {
        String sql = "INSERT INTO Activity (destinationID, categoryID, title, activityDescription, website, isCompleted) VALUES (?, ?, ?, ?, ?, ?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();

        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);
            ps.setInt(1, activity.getDestinationID());
            ps.setInt(2, activity.getCategoryID());
            ps.setString(3, activity.getTitle());
            ps.setString(4, activity.getActivityDescription());
            ps.setString(5, activity.getWebsite());
            ps.setBoolean(6, activity.isCompleted());

            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        activity.setActivityID(keyHolder.getKey().intValue());

        return activity;
    }

    @Override
    public Activity update(Activity activity) {
        String sql = "UPDATE Activity SET categoryID = ?, title = ?, activityDescription = ?, website = ?, isCompleted =? WHERE activityID = ?;";
        int rows = jdbcTemplate.update(sql,
                activity.getCategoryID(),
                activity.getTitle(),
                activity.getActivityDescription(),
                activity.getWebsite(),
                activity.isCompleted(),
                activity.getActivityID()
                );
        return rows > 0 ? activity : null;
    }

    @Override
    public boolean delete(int activityID) {
        String sql = "DELETE FROM Activity WHERE activityID = ?";
        return jdbcTemplate.update(sql, activityID) > 0;
    }
}
