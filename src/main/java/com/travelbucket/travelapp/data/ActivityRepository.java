package com.travelbucket.travelapp.data;

import com.travelbucket.travelapp.model.Activity;

import java.util.List;

public interface ActivityRepository {
    public List<Activity> getAll();
    public List<Activity> getAllByDestinationId(int destinationID);
    public Activity getById(int activityID);
    public Activity add(Activity activity);
    public Activity update(Activity activity);
    public boolean delete(int activityID);
}
