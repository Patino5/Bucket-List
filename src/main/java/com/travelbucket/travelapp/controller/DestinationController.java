package com.travelbucket.travelapp.controller;

import com.travelbucket.travelapp.model.Destination;
import com.travelbucket.travelapp.service.DestinationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/destinations")
public class DestinationController {

    @Autowired
    private final DestinationService destinationService;

    public DestinationController(DestinationService destinationService) {
        this.destinationService = destinationService;
    }

    // GET /api/destinations
    @GetMapping()
    public ResponseEntity<List<Destination>> getAll() {
        List<Destination> destinationList = destinationService.getAll();
        return ResponseEntity.ok(destinationList);
    }

    // GET /api/destinations/userId/{userID}
    @GetMapping("/user/{userID}")
    public ResponseEntity<List<Destination>> getAllForUser(@PathVariable("userID") int userId) {
        List<Destination> list = destinationService.getAllForUser(userId);
        return ResponseEntity.ok(list);
    }

    // GET /api/destinations/{destinationID}
    @GetMapping("/{destinationID}")
    public ResponseEntity<Destination> getById(@PathVariable("destinationID") int destinationID) {
        Destination destination = destinationService.getById(destinationID);
        return destination != null ? ResponseEntity.ok(destination) : ResponseEntity.notFound().build();
    }

    // POST /api/destinations
    @PostMapping
    public ResponseEntity<Destination> add(@RequestBody Destination destination) {
        Destination created = destinationService.add(destination);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // PUT /api/destinations/{destinationID}
    @PutMapping("/{destinationID}")
    public ResponseEntity<Destination> update(@PathVariable("destinationID") int destinationID, @RequestBody Destination destination) {
        destination.setDestinationID(destinationID);
        Destination updated = destinationService.update(destination);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    // DELETE /api/destinations/{destinationID}
    @DeleteMapping("/{destinationID}")
    public ResponseEntity<Void> delete(@PathVariable("destinationID") int destinationID) {
        boolean removed = destinationService.delete(destinationID);
        return removed ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
