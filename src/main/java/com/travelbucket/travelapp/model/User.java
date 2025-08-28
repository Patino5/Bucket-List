package com.travelbucket.travelapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private int userID;
    private String userName;
    private String userPassword;
    private String email;

    public User(String userName, String userPassword, String email) {
        this.userName = userName;
        this.userPassword = userPassword;
        this.email = email;
    }
}
