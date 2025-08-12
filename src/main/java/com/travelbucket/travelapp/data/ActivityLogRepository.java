package com.travelbucket.travelapp.data;

import com.travelbucket.travelapp.model.ActivityLog;

import java.util.List;

public interface ActivityLogRepository {
    public List<ActivityLog> findAll();
    public ActivityLog findById(int memoryID);
    public ActivityLog add(ActivityLog activityLog);
    public ActivityLog update(ActivityLog activityLog);
    public boolean delete(int memoryID);
}
