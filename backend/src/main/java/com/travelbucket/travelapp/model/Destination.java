package com.travelbucket.travelapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Destination {
    private int destinationID;
    private int userID;
    private String city;
    private String Country;
    private LocalDateTime homeDeparture;
    private LocalDateTime destinationDeparture;
}
