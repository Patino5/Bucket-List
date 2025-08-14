Drop Database if exists BucketList;
Create Database BucketList;

USE BucketList;

-- USER TABLE
CREATE TABLE User (
    userID INT AUTO_INCREMENT PRIMARY KEY,
    userName VARCHAR(50) UNIQUE NOT NULL,
    userPassword VARCHAR(255) NOT NULL, -- store hashed passwords
    email VARCHAR(150) NOT NULL UNIQUE
);

-- CATEGORY TABLE
CREATE TABLE Category (
    categoryID INT AUTO_INCREMENT PRIMARY KEY,
    categoryName VARCHAR(50) UNIQUE NOT NULL
);

-- DESTINATION TABLE
CREATE TABLE Destination (
    destinationID INT AUTO_INCREMENT PRIMARY KEY,
    userID INT NOT NULL,
    city VARCHAR(50) NOT NULL,
    country VARCHAR(50) NOT NULL,
    homeDeparture DATETIME,
    destinationDeparture DATETIME,
    FOREIGN KEY (userID) REFERENCES User(userID) ON DELETE CASCADE
);

-- ACTIVITY TABLE
CREATE TABLE Activity (
    activityID INT AUTO_INCREMENT PRIMARY KEY,
    destinationID INT NOT NULL,
    categoryID INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    activityDescription TEXT,
    website VARCHAR(200),
    isCompleted BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (destinationID) REFERENCES Destination(destinationID) ON DELETE CASCADE,
    FOREIGN KEY (categoryID) REFERENCES Category(categoryID)
);

-- ACTIVITY LOG TABLE
CREATE TABLE ActivityLog (
    memoryID INT AUTO_INCREMENT PRIMARY KEY,
    activityID INT NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,
    photoURL VARCHAR(255), -- URL or file path
    FOREIGN KEY (activityID) REFERENCES Activity(activityID) ON DELETE CASCADE
);