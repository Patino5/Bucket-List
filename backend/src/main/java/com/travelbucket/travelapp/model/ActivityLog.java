package com.travelbucket.travelapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ActivityLog {
    private int memoryID;
    private int activityID;
    private LocalDateTime createdAt;
    private String notes;
    private byte[] photo;
    private String photoMimeType;
    private String photoFileName;
}
