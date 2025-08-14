package com.travelbucket.travelapp.data;

import com.travelbucket.travelapp.model.User;

import java.util.List;

public interface UserRepository {
    public List<User> findAll();
    public User findById(int userID);
    public User findByUsernameAndPassword(String userName, String userPassword);
    public User add(User user);
    public User updateUser(User user);
    public boolean deleteUser(int userID);
}
