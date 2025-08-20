package com.travelbucket.travelapp.service;

import com.travelbucket.travelapp.data.ActivityLogRepository;
import com.travelbucket.travelapp.data.ActivityRepository;
import com.travelbucket.travelapp.model.ActivityLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActivityLogService {

    @Autowired
    private ActivityLogRepository repository;

    @Autowired
    private ActivityRepository activityRepository;


    public List<ActivityLog> getAll(){
        return repository.getAll();
    }

    public ActivityLog getById(int memoryID) {
        return repository.getById(memoryID);
    }

    public ActivityLog add(ActivityLog activityLog) {
        return repository.add(activityLog);
    }

    public ActivityLog update(ActivityLog activityLog) {
        return repository.update(activityLog);
    }

    public boolean delete(int memoryID) {
        return repository.delete(memoryID);
    }
}
