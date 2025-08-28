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
            @RequestParam(value = "notes") String notes,
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

    @PutMapping(value = "/{memoryID}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ActivityLog> updateActivityLog(
            @PathVariable("memoryID") int memoryID,
            @RequestParam(value = "notes") String notes,
            @RequestParam(value = "photo", required = false) MultipartFile photo,
            @RequestParam(value = "removeCurrentPhoto", defaultValue = "false") boolean removeCurrentPhoto
    ) {
        try {
            // Get existing activity log
            ActivityLog existingLog = activityLogService.getById(memoryID);
            if (existingLog == null) {
                return ResponseEntity.notFound().build();
            }

            // Update notes
            if (notes != null) {
                existingLog.setNotes(notes);
            }

            // Handle photo updates
            if (removeCurrentPhoto) {
                // Remove the current photo
                existingLog.setPhoto(null);
                existingLog.setPhotoMimeType(null);
                existingLog.setPhotoFileName(null);
            }

            if (photo != null && !photo.isEmpty()) {
                // Validate file size (16MB limit for MEDIUMBLOB)
                if (photo.getSize() > 16 * 1024 * 1024) {
                    return ResponseEntity.badRequest().build();
                }

                // Add/replace photo
                byte[] photoBytes = photo.getBytes();
                existingLog.setPhoto(photoBytes);
                existingLog.setPhotoMimeType(photo.getContentType());
                existingLog.setPhotoFileName(photo.getOriginalFilename());
            }

            ActivityLog updated = activityLogService.update(existingLog);
            return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();

        } catch (Exception e) {
            System.err.println("Error updating activity log: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @DeleteMapping("/{memoryID}")
    public ResponseEntity<ActivityLog> delete(@PathVariable("memoryID") int memoryID) {
        activityLogService.delete(memoryID);
        return ResponseEntity.noContent().build();
    }


}
