package com.travelbucket.travelapp.controller;


import com.travelbucket.travelapp.model.ActivityLog;
import com.travelbucket.travelapp.service.ActivityLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("api/activitylogs")
public class ActivityLogController {

    @Autowired
    private ActivityLogService activityLogService;

    // GET all
    @GetMapping()
    public ResponseEntity<List<ActivityLog>> getAll() {
        List<ActivityLog> activityLogList = activityLogService.getAll();
        return ResponseEntity.ok(activityLogList);
    }

    @GetMapping("/{memoryID}")
    public ResponseEntity<ActivityLog> getById(@PathVariable("memoryID") int memoryID) {
        ActivityLog activityLog = activityLogService.getById(memoryID);
        return activityLog != null ? ResponseEntity.ok(activityLog) : ResponseEntity.notFound().build();
    }


}
