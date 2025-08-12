package com.travelbucket.travelapp.data.mappers;

import com.travelbucket.travelapp.model.Destination;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;

@Component
public class DestinationRowMapper implements RowMapper<Destination> {
    @Override
    public Destination mapRow(ResultSet rs, int rowNum) throws SQLException {
        Destination destination = new Destination();
        destination.setDestinationID(rs.getInt("destinationID"));
        destination.setUserID(rs.getInt("userID"));
        destination.setCity(rs.getString("city"));
        destination.setCountry(rs.getString("country"));
        destination.setHomeDeparture(rs.getTimestamp("homeDeparture") != null
                ? rs.getTimestamp("homeDeparture").toLocalDateTime() : null);
        destination.setDestinationDeparture(rs.getTimestamp("destinationDeparture") != null
                ? rs.getTimestamp("destinationDeparture").toLocalDateTime() : null);
        return destination;
    }
}
