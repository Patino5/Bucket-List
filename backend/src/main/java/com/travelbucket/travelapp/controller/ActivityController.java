package com.travelbucket.travelapp.controller;

import com.travelbucket.travelapp.exception.InternalErrorException;
import com.travelbucket.travelapp.model.Activity;
import com.travelbucket.travelapp.service.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("api/activity")
public class ActivityController {

    @Autowired
    private ActivityService activityService;

    @GetMapping()
    public ResponseEntity<List<Activity>> getAll() {
        List<Activity> activityList = activityService.getAll();
        return ResponseEntity.ok(activityList);
    }

    @GetMapping("/{destinationID}")
    public ResponseEntity<List<Activity>> getAllForDestination(@PathVariable("destinationID") int destinationID) {
        List<Activity> list = activityService.getAllForDestination(destinationID);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/single/{activityID}")
    public ResponseEntity<Activity> getById(@PathVariable("activityID") int activityID) {
        Activity activity = activityService.getById(activityID);
        if (activity == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(activity);
    }

    @PostMapping()
    public ResponseEntity<?> add(@RequestBody Activity activity) {
        try {
            Activity created = activityService.add(activity);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (InternalErrorException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{activityID}")
    public ResponseEntity<Void> delete(@PathVariable("activityID") int activityID) {
        activityService.delete(activityID);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{activityID}")
    public ResponseEntity<?> update(@PathVariable("activityID") int activityID, @RequestBody Activity activity) {
        try {
            activity.setActivityID(activityID);
            Activity updated = activityService.update(activity);
            return ResponseEntity.ok(updated);
        } catch (InternalErrorException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", e.getMessage()));
        }
    }
}
