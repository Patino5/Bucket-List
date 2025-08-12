package com.travelbucket.travelapp.data.impl;

import com.travelbucket.travelapp.data.DestinationRepository;
import com.travelbucket.travelapp.data.mappers.DestinationRowMapper;
import com.travelbucket.travelapp.model.Destination;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.List;

@Repository
public class DestinationRepo implements DestinationRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private DestinationRowMapper destinationRowMapper;

    @Override
    public List<Destination> getAllDestinations() {
        String sql = "SELECT * FROM Destination;";

        return jdbcTemplate.query(sql, destinationRowMapper);
    }

    @Override
    public List<Destination> findAllByUserId(int userID) {
        String sql = "Select * From Destination WHERE userID = ?;";

        return jdbcTemplate.query(sql, destinationRowMapper, userID);
    }

    @Override
    public Destination findById(int destinationID) {
        String sql = "Select * from Destination WHERE destinationID = ?;";
        return jdbcTemplate.queryForObject(sql, destinationRowMapper, destinationID);
    }

    @Override
    public Destination add(Destination destination) {
        String sql = "Insert INTO Destination (userID, city, country, homeDeparture, destinationDeparture) VALUES (?,?,?,?,?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, destination.getUserID());
            ps.setString(2, destination.getCity());
            ps.setString(3, destination.getCountry());
            if (destination.getHomeDeparture() != null) {
                ps.setTimestamp(4, Timestamp.valueOf(destination.getHomeDeparture()));
            } else {
                ps.setTimestamp(4, null);
            }
            if (destination.getDestinationDeparture() != null) {
                ps.setTimestamp(5, Timestamp.valueOf(destination.getDestinationDeparture()));
            } else {
                ps.setTimestamp(5, null);
            }
            return ps;

        }, keyHolder);

        Number key = keyHolder.getKey();
        if (key != null) {
            destination.setDestinationID(key.intValue());
            return destination;
        }
        return null;
    }

    @Override
    public Destination update(Destination destination) {
        String sql = "UPDATE Destination SET userID = ?, city = ?, country = ?, homeDeparture = ?, destinationDeparture = ? WHERE destinationID = ?;";
        int rows = jdbcTemplate.update(sql,
                destination.getUserID(),
                destination.getCity(),
                destination.getCountry(),
                destination.getHomeDeparture() != null ? Timestamp.valueOf(destination.getHomeDeparture()) : null,
                destination.getDestinationDeparture() != null ? Timestamp.valueOf(destination.getDestinationDeparture()) : null,
                destination.getDestinationID()
        );
        return rows > 0 ? destination : null;
    }

    @Override
    public boolean delete(int destinationID) {
        String sql = "DELETE FROM Destination WHERE destinationID = ?;";
        return jdbcTemplate.update(sql, destinationID) > 0;
    }
}
