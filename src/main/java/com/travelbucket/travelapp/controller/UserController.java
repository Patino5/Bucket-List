package com.travelbucket.travelapp.controller;

import com.travelbucket.travelapp.model.User;
import com.travelbucket.travelapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping()
    public ResponseEntity<List<User>> getAll() {
        List<User> userList = userService.getAll();
        return ResponseEntity.ok(userList);
    }

    @GetMapping("/user/{userID}")
    public ResponseEntity<User> getUserById(@PathVariable("userID") int userID) {
        User user = userService.getByUserId(userID);
        return user != null ? ResponseEntity.ok(user) : ResponseEntity.notFound().build();
    }

    @PostMapping("/register")
    public ResponseEntity<?> add(@RequestBody User user) {
        try {
            User created = userService.add(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error registering user: " + e.getMessage());
        }
    }

    @PutMapping("/{userID}")
    public ResponseEntity<User> update(@PathVariable("userID") int userID, @RequestBody User user) {
        user.setUserID(userID);
        User updated = userService.update(user);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{userID}")
    public ResponseEntity<Void> delete(@PathVariable("userID") int userID) {
        boolean removed = userService.delete(userID);
        return removed ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        User user = userService.login(loginRequest.getUserName(), loginRequest.getUserPassword());

        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }
}

