package com.travelbucket.travelapp.service;

import com.travelbucket.travelapp.data.ActivityRepository;
import com.travelbucket.travelapp.exception.InternalErrorException;
import com.travelbucket.travelapp.model.Activity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;

@Service
public class ActivityService {

    @Autowired
    private ActivityRepository repository;

    public List<Activity> getAll() {
        return repository.getAll();
    }

    public List<Activity> getAllForDestination(int destinationID) {
        validateDestinationId(destinationID);
        return repository.getAllByDestinationId(destinationID);
    }

    public Activity getById(int activityID) {
        validateActivityId(activityID);
        Activity activity = repository.getById(activityID);
        if (activity == null) {
            throw new InternalErrorException("Activity not found with ID: " + activityID);
        }
        return activity;
    }

    public Activity add(Activity activity) {
        validateActivityForCreation(activity);

        // Check for duplicate activities
        if (isDuplicateActivity(activity)) {
            throw new InternalErrorException("Activity with similar title already exists for this destination");
        }

        // Set default values
        activity.setCompleted(false);

        return repository.add(activity);
    }

    public Activity update(Activity activity) {
        validateActivityForUpdate(activity);

        // Verify activity exists before updating
        Activity existingActivity = repository.getById(activity.getActivityID());
        if (existingActivity == null) {
            throw new InternalErrorException("Cannot update non-existent activity with ID: " + activity.getActivityID());
        }

        return repository.update(activity);
    }

    public boolean delete(int activityID) {
        validateActivityId(activityID);

        // Check if activity exists before deletion
        Activity existingActivity = repository.getById(activityID);
        if (existingActivity == null) {
            throw new InternalErrorException("Cannot delete non-existent activity with ID: " + activityID);
        }

        return repository.delete(activityID);
    }

    // Validation Methods
    private void validateActivityId(int activityID) {
        if (activityID <= 0) {
            throw new InternalErrorException("Activity ID must be a positive integer");
        }
    }

    private void validateDestinationId(int destinationID) {
        if (destinationID <= 0) {
            throw new InternalErrorException("Destination ID must be a positive integer");
        }
    }

    private void validateActivityForCreation(Activity activity) {
        if (activity == null) {
            throw new InternalErrorException("Activity cannot be null");
        }

        validateActivityFields(activity);

        // Activity ID should not be set for new activities
        if (activity.getActivityID() > 0) {
            throw new InternalErrorException("Activity ID should not be set for new activities");
        }
    }

    private void validateActivityForUpdate(Activity activity) {
        if (activity == null) {
            throw new InternalErrorException("Activity cannot be null");
        }

        validateActivityId(activity.getActivityID());
        validateActivityFields(activity);
    }

    private void validateActivityFields(Activity activity) {
        // Title is required and must not be empty
        if (!StringUtils.hasText(activity.getTitle())) {
            throw new InternalErrorException("Activity title is required");
        }

        // Title length validation
        if (activity.getTitle().length() > 200) {
            throw new InternalErrorException("Activity title cannot exceed 200 characters");
        }

        // Destination ID is required
        if (activity.getDestinationID() <= 0) {
            throw new InternalErrorException("Valid destination ID is required");
        }

        // Category ID is required
        if (activity.getCategoryID() <= 0) {
            throw new InternalErrorException("Valid category ID is required");
        }

        // Description validation (optional but if provided, limit length)
        if (activity.getActivityDescription() != null && activity.getActivityDescription().length() > 1000) {
            throw new InternalErrorException("Activity description cannot exceed 1000 characters");
        }

        // Website URL validation (basic check)
        if (StringUtils.hasText(activity.getWebsite()) && !isValidUrl(activity.getWebsite())) {
            throw new InternalErrorException("Invalid website URL format");
        }
    }

    private boolean isDuplicateActivity(Activity activity) {
        // Check for activities with the same title in the same destination
        List<Activity> existingActivities = repository.getAllByDestinationId(activity.getDestinationID());
        return existingActivities.stream()
                .anyMatch(existing -> existing.getTitle().equalsIgnoreCase(activity.getTitle().trim()));
    }

    private boolean isValidUrl(String url) {
        return url.matches("^https?://.*") || url.matches("^www\\..*");
    }
}