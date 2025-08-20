package com.travelbucket.travelapp.controller;

import com.travelbucket.travelapp.model.Activity;
import com.travelbucket.travelapp.model.Destination;
import com.travelbucket.travelapp.service.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("api/activity")
public class ActivityController {

    @Autowired
    private final ActivityService activityService;

    public ActivityController(ActivityService activityService) {
        this.activityService = activityService;
    }

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

    @PostMapping()
    public ResponseEntity<Activity> add(@RequestBody Activity activity) {
        Activity created = activityService.add(activity);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}
