package com.travelbucket.travelapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Activity {
    private int activityID;
    private int destinationID;
    private int categoryID;
    private String title;
    private String activityDescription;
    private String website;
    private boolean isCompleted;
}
