package com.travelbucket.travelapp.service;

import com.travelbucket.travelapp.data.DestinationRepository;
import com.travelbucket.travelapp.model.Destination;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DestinationService {
    private final DestinationRepository repository;

    public DestinationService(DestinationRepository repository) {
        this.repository = repository;
    }

    public List<Destination> getAllForUser(int userID) {
        return repository.findAllByUserId(userID);
    }

    public Destination getById(int destinationID) {
        return repository.findById(destinationID);
    }

    public Destination add(Destination destination) {
        return repository.add(destination);
    }

    public Destination update(Destination destination) {
        return repository.update(destination);
    }

    public boolean delete(int destinationID) {
        return repository.delete(destinationID);
    }

    public List<Destination> getAll() {
        return repository.getAllDestinations();
    }
}
