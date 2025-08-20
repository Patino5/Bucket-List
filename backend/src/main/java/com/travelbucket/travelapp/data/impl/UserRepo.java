package com.travelbucket.travelapp.data.impl;

import com.travelbucket.travelapp.data.UserRepository;
import com.travelbucket.travelapp.data.mappers.UserRowMapper;
import com.travelbucket.travelapp.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class UserRepo implements UserRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private UserRowMapper userRowMapper;

    @Override
    public List<User> findAll() {
        String sql = "SELECT * FROM User;";
        return jdbcTemplate.query(sql, userRowMapper);
    }

    @Override
    public User findById(int userID) {
        String sql = "SELECT * FROM User WHERE userID = ?;";
        return jdbcTemplate.queryForObject(sql, userRowMapper, userID);
    }

    @Override
    public User findByUsernameAndPassword(String userName, String userPassword) {
        String sql = "SELECT * FROM User WHERE userName = ? AND userPassword = ?;";
        return jdbcTemplate.queryForObject(sql, userRowMapper, userName, userPassword);
    }

    @Override
    public User add(User user) {
        String sql = "INSERT INTO User (userName, userPassword, email) VALUES (?, ?, ?);";
        KeyHolder keyHolder = new GeneratedKeyHolder();

        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, user.getUserName());
            ps.setString(2, user.getUserPassword());
            ps.setString(3, user.getEmail());

            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        int generatedUserID = keyHolder.getKey().intValue();
        user.setUserID(generatedUserID);

        return user;
    }

    @Override
    public User updateUser(User user) {
        String sql = "UPDATE User SET userName = ?, userPassword = ?, email = ? WHERE userID = ?;";
        int rowAffected = jdbcTemplate.update(sql,
                user.getUserName(),
                user.getUserPassword(),
                user.getEmail(),
                user.getUserID());

        return rowAffected > 0 ? user : null;
    }

    @Override
    public boolean deleteUser(int userID) {
        String sql = "DELETE FROM User WHERE userID = ?;";
        return jdbcTemplate.update(sql, userID) > 0;
    }
}
