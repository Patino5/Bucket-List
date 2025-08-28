package com.travelbucket.travelapp.service;

import com.travelbucket.travelapp.data.ActivityRepository;
import com.travelbucket.travelapp.exception.InternalErrorException;
import com.travelbucket.travelapp.model.Activity;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("ActivityService Tests")
class ActivityServiceTest {

    @Mock
    private ActivityRepository repository;

    @InjectMocks
    private ActivityService activityService;

    private Activity validActivity;
    private Activity existingActivity;

    @BeforeEach
    void setUp() {
        validActivity = new Activity(0, 1, 1, "Test Activity", "Test Description", "https://example.com", false);
        existingActivity = new Activity(1, 1, 1, "Existing Activity", "Existing Description", "https://example.com", false);
    }

    @Nested
    @DisplayName("Get All Activities Tests")
    class GetAllActivitiesTests {

        @Test
        @DisplayName("Should return all activities")
        void getAll_ShouldReturnAllActivities() {
            // Given
            List<Activity> expectedActivities = Arrays.asList(existingActivity, validActivity);
            when(repository.getAll()).thenReturn(expectedActivities);

            // When
            List<Activity> result = activityService.getAll();

            // Then
            assertEquals(expectedActivities, result);
            verify(repository).getAll();
        }

        @Test
        @DisplayName("Should return empty list when no activities exist")
        void getAll_ShouldReturnEmptyList_WhenNoActivitiesExist() {
            // Given
            when(repository.getAll()).thenReturn(Arrays.asList());

            // When
            List<Activity> result = activityService.getAll();

            // Then
            assertTrue(result.isEmpty());
            verify(repository).getAll();
        }
    }

    @Nested
    @DisplayName("Get Activities by Destination Tests")
    class GetActivitiesByDestinationTests {

        @Test
        @DisplayName("Should return activities for valid destination ID")
        void getAllForDestination_ShouldReturnActivities_WhenValidDestinationId() {
            // Given
            int destinationId = 1;
            List<Activity> expectedActivities = Arrays.asList(existingActivity);
            when(repository.getAllByDestinationId(destinationId)).thenReturn(expectedActivities);

            // When
            List<Activity> result = activityService.getAllForDestination(destinationId);

            // Then
            assertEquals(expectedActivities, result);
            verify(repository).getAllByDestinationId(destinationId);
        }

        @Test
        @DisplayName("Should throw exception for invalid destination ID")
        void getAllForDestination_ShouldThrowException_WhenInvalidDestinationId() {
            // When & Then
            InternalErrorException exception = assertThrows(InternalErrorException.class,
                    () -> activityService.getAllForDestination(0));
            assertEquals("Destination ID must be a positive integer", exception.getMessage());

            exception = assertThrows(InternalErrorException.class,
                    () -> activityService.getAllForDestination(-1));
            assertEquals("Destination ID must be a positive integer", exception.getMessage());
        }
    }

    @Nested
    @DisplayName("Get Activity by ID Tests")
    class GetActivityByIdTests {

        @Test
        @DisplayName("Should return activity when found")
        void getById_ShouldReturnActivity_WhenActivityExists() {
            // Given
            int activityId = 1;
            when(repository.getById(activityId)).thenReturn(existingActivity);

            // When
            Activity result = activityService.getById(activityId);

            // Then
            assertEquals(existingActivity, result);
            verify(repository).getById(activityId);
        }

        @Test
        @DisplayName("Should throw exception when activity not found")
        void getById_ShouldThrowException_WhenActivityNotFound() {
            // Given
            int activityId = 999;
            when(repository.getById(activityId)).thenReturn(null);

            // When & Then
            InternalErrorException exception = assertThrows(InternalErrorException.class,
                    () -> activityService.getById(activityId));
            assertEquals("Activity not found with ID: " + activityId, exception.getMessage());
        }

        @Test
        @DisplayName("Should throw exception for invalid activity ID")
        void getById_ShouldThrowException_WhenInvalidActivityId() {
            // When & Then
            InternalErrorException exception = assertThrows(InternalErrorException.class,
                    () -> activityService.getById(0));
            assertEquals("Activity ID must be a positive integer", exception.getMessage());
        }
    }

    @Nested
    @DisplayName("Add Activity Tests")
    class AddActivityTests {

        @Test
        @DisplayName("Should add valid activity successfully")
        void add_ShouldAddActivity_WhenValidActivity() {
            // Given
            Activity newActivity = new Activity(0, 1, 1, "New Activity", "Description", "https://example.com", false);
            Activity savedActivity = new Activity(1, 1, 1, "New Activity", "Description", "https://example.com", false);

            when(repository.getAllByDestinationId(1)).thenReturn(Arrays.asList());
            when(repository.add(any(Activity.class))).thenReturn(savedActivity);

            // When
            Activity result = activityService.add(newActivity);

            // Then
            assertEquals(savedActivity, result);
            assertFalse(result.isCompleted()); // Should be set to false by default
            verify(repository).add(newActivity);
        }

        @Test
        @DisplayName("Should throw exception for null activity")
        void add_ShouldThrowException_WhenActivityIsNull() {
            // When & Then
            InternalErrorException exception = assertThrows(InternalErrorException.class,
                    () -> activityService.add(null));
            assertEquals("Activity cannot be null", exception.getMessage());
        }

        @Test
        @DisplayName("Should throw exception when activity has ID set")
        void add_ShouldThrowException_WhenActivityHasIdSet() {
            // Given
            Activity activityWithId = new Activity(5, 1, 1, "Test", "Description", null, false);

            // When & Then
            InternalErrorException exception = assertThrows(InternalErrorException.class,
                    () -> activityService.add(activityWithId));
            assertEquals("Activity ID should not be set for new activities", exception.getMessage());
        }
    }
}