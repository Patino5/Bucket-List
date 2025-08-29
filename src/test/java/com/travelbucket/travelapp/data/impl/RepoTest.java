package com.travelbucket.travelapp.data.impl;

import static org.junit.jupiter.api.Assertions.*;

import com.travelbucket.travelapp.model.Destination;
import com.travelbucket.travelapp.model.User;
import com.travelbucket.travelapp.data.DestinationRepository;
import com.travelbucket.travelapp.data.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@SpringBootTest
@SpringJUnitConfig
@Transactional // This ensures each test, rolls back changes
class RepoTest {
    @Autowired
    private UserRepository userRepository;


    @Autowired
    private DestinationRepository destinationRepository;

    // User Repository Tests
    @Test
    void userRepository_CreateUser_ShouldReturnUserWithId() {
        User user = new User(0, "testuser123", "password123", "test123@example.com");

        User result = userRepository.add(user);

        assertNotNull(result);
        assertTrue(result.getUserID() > 0);
        assertEquals("testuser123", result.getUserName());
        assertEquals("test123@example.com", result.getEmail());
    }

    @Test
    void userRepository_FindById_ShouldReturnCorrectUser() {
        // Create a user first
        User user = new User(0, "findtest", "password123", "findtest@example.com");
        User createdUser = userRepository.add(user);

        // Find by ID
        User foundUser = userRepository.findById(createdUser.getUserID());

        assertNotNull(foundUser);
        assertEquals(createdUser.getUserID(), foundUser.getUserID());
        assertEquals("findtest", foundUser.getUserName());
    }

    @Test
    void userRepository_UpdateUser_ShouldUpdateSuccessfully() {
        User user = new User(0, "updatetest", "password123", "update@example.com");
        User createdUser = userRepository.add(user);

        createdUser.setUserName("updateduser");
        createdUser.setEmail("updated@example.com");
        User result = userRepository.updateUser(createdUser);

        assertNotNull(result);

        User updatedUser = userRepository.findById(createdUser.getUserID());
        assertEquals("updateduser", updatedUser.getUserName());
        assertEquals("updated@example.com", updatedUser.getEmail());
    }

    // Destination Repository Tests
    @Test
    void destinationRepository_CreateDestination_ShouldReturnDestinationWithId() {
        // First create a user
        User user = new User(0, "destuser", "password123", "dest@example.com");
        User createdUser = userRepository.add(user);

        Destination destination = new Destination(0, createdUser.getUserID(), "Paris", "France",
                LocalDateTime.now().plusDays(30), LocalDateTime.now().plusDays(37));

        Destination result = destinationRepository.add(destination);

        assertNotNull(result);
        assertTrue(result.getDestinationID() > 0);
        assertEquals("Paris", result.getCity());
        assertEquals("France", result.getCountry());
    }

    @Test
    void destinationRepository_FindByUserId_ShouldReturnUserDestinations() {
        // Create user
        User user = new User(0, "destuser2", "password123", "dest2@example.com");
        User createdUser = userRepository.add(user);

        // Create destinations
        Destination dest1 = new Destination(0, createdUser.getUserID(), "Tokyo", "Japan", null, null);
        Destination dest2 = new Destination(0, createdUser.getUserID(), "London", "UK", null, null);

        destinationRepository.add(dest1);
        destinationRepository.add(dest2);

        List<Destination> userDestinations = destinationRepository.findAllByUserId(createdUser.getUserID());

        assertTrue(userDestinations.size() >= 2);
        assertTrue(userDestinations.stream().anyMatch(d -> "Tokyo".equals(d.getCity())));
        assertTrue(userDestinations.stream().anyMatch(d -> "London".equals(d.getCity())));
    }

    @Test
    void destinationRepository_UpdateDestination_ShouldUpdateSuccessfully() {
        User user = userRepository.add(new User(0, "updateuser", "pass123", "update@example.com"));
        Destination destination = new Destination(0, user.getUserID(), "Rome", "Italy", null, null);
        Destination createdDestination = destinationRepository.add(destination);

        createdDestination.setCity("Milan");
        Destination result = destinationRepository.update(createdDestination);

        assertNotNull(result);

        Destination updatedDestination = destinationRepository.findById(createdDestination.getDestinationID());
        assertEquals("Milan", updatedDestination.getCity());
    }
}
