package com.travelbucket.travelapp.service;

import com.travelbucket.travelapp.data.UserRepository;
import com.travelbucket.travelapp.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public List<User> getAll() {
        return repository.findAll();
    }

    public User getByUserId(int userID) {
        return repository.findById(userID);
    }

    public User add(User user) {
        return repository.add(user);
    }

    public User update(User user) {
        return repository.updateUser(user);
    }

    public boolean delete(int userID) {
        return repository.deleteUser(userID);
    }

    public User login(String userName, String userPassword) {
        return repository.findByUsernameAndPassword(userName, userPassword);
    }
}
