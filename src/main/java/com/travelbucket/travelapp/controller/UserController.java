package com.travelbucket.travelapp.controller;

import com.travelbucket.travelapp.model.User;
import com.travelbucket.travelapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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
    public ResponseEntity<?> getUserById(@PathVariable("userID") int userID) {
        User user = userService.getByUserId(userID);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "User not found"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> add(@RequestBody User user) {
        try {
            User created = userService.add(user);
            if (created != null) {
                return ResponseEntity.status(HttpStatus.CREATED).body(created);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("error", "Error registering user"));
            }
        } catch (DuplicateKeyException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "Username/email already exists"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Error registering user"));
        }
    }

    @PutMapping("/{userID}")
    public ResponseEntity<?> update(@PathVariable("userID") int userID, @RequestBody User user) {
        user.setUserID(userID);
        User updated = userService.update(user);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "User not found or could not be updated"));
        }
    }

    @DeleteMapping("/{userID}")
    public ResponseEntity<?> delete(@PathVariable("userID") int userID) {
        boolean removed = userService.delete(userID);
        if (removed) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "User not found or could not be deleted"));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        User user = userService.login(loginRequest.getUserName(), loginRequest.getUserPassword());

        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
        }
    }
}

