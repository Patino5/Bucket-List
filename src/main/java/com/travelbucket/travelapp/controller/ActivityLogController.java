package com.travelbucket.travelapp.controller;

import com.travelbucket.travelapp.model.ActivityLog;
import com.travelbucket.travelapp.service.ActivityLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.Base64;
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

    @GetMapping("/user/{userID}")
    public ResponseEntity<List<ActivityLog>> getUsersLogs(@PathVariable("userID") int userID) {
        try {
            List<ActivityLog> userLogs = activityLogService.getUserLogs(userID);

            // Log for debugging
            if (userLogs != null) {
                for (ActivityLog log : userLogs) {
                    if (log.getPhoto() != null) {
                        System.out.println("Memory " + log.getMemoryID() + " has photo of length: " + log.getPhoto().length);
                        System.out.println("MIME type: " + log.getPhotoMimeType());
                    }
                }
            }

            return userLogs != null ? ResponseEntity.ok(userLogs) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            System.err.println("Error fetching user logs: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ActivityLog> addActivityLog(
            @RequestParam("activityID") int activityID,
            @RequestParam(value = "notes", required = false) String notes,
            @RequestParam(value = "photo", required = false) MultipartFile photo
    ) {
        try {
            ActivityLog log = new ActivityLog();
            log.setActivityID(activityID);
            log.setNotes(notes);
            log.setCreatedAt(LocalDateTime.now());

            if (photo != null && !photo.isEmpty()) {
                log.setPhoto(photo.getBytes());
                log.setPhotoMimeType(photo.getContentType());
                log.setPhotoFileName(photo.getOriginalFilename());
            }

            ActivityLog saved = activityLogService.add(log);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{memoryID}")
    public ResponseEntity<ActivityLog> delete(@PathVariable("memoryID") int memoryID) {
        activityLogService.delete(memoryID);
        return ResponseEntity.noContent().build();
    }


}
