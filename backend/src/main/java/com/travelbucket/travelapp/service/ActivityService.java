package com.travelbucket.travelapp.service;

import com.travelbucket.travelapp.data.ActivityRepository;
import com.travelbucket.travelapp.data.impl.ActivityRepo;
import com.travelbucket.travelapp.model.Activity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActivityService {
    @Autowired
    private ActivityRepository repository;

    public List<Activity> getAll() {
        return repository.getAll();
    }

    public List<Activity> getAllForDestination(int destinationID) {
        return repository.getAllByDestinationId(destinationID);
    }

    public Activity getById(int activityID) {
        return repository.getById(activityID);
    }

    public Activity add(Activity activity) {
        return repository.add(activity);
    }

    public Activity update(Activity activity) {
        return repository.update(activity);
    }

    public boolean delete(int activityID) {
        return repository.delete(activityID);
    }
}
