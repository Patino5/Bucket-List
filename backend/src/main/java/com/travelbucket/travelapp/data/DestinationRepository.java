package com.travelbucket.travelapp.data;

import com.travelbucket.travelapp.model.Destination;

import java.util.List;

public interface DestinationRepository {
    public List<Destination> findAllByUserId(int userID);
    public Destination findById(int destinationID);
    public Destination add(Destination destination);
    public Destination update(Destination destination);
    public boolean delete(int destinationID);

    public List<Destination> getAllDestinations();
}
