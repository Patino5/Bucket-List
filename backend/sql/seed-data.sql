-- USERS
INSERT INTO User (userName, userPassword, email) VALUES
('alice', 'hashed_pass_1', 'alice@example.com'),
('bob', 'hashed_pass_2', 'bob@example.com'),
('charlie', 'hashed_pass_3', 'charlie@example.com'),
('diana', 'hashed_pass_4', 'diana@example.com'),
('eve', 'hashed_pass_5', 'eve@example.com');

-- CATEGORIES
INSERT INTO Category (categoryName) VALUES
('Adventure'),
('Relaxation'),
('Culture'),
('Food'),
('Nature');

-- DESTINATIONS
INSERT INTO Destination (userID, city, country, homeDeparture, destinationDeparture) VALUES
(1, 'Paris', 'France', '2025-08-01 10:00:00', '2025-08-10 14:00:00'),
(1, 'Rome', 'Italy', NULL, NULL),
(2, 'Tokyo', 'Japan', '2025-09-15 08:30:00', NULL),
(2, 'Bangkok', 'Thailand', '2025-10-05 12:00:00', '2025-10-20 18:00:00'),
(3, 'New York', 'USA', NULL, NULL),
(3, 'Toronto', 'Canada', '2025-07-01 09:00:00', '2025-07-08 17:00:00'),
(4, 'Reykjavik', 'Iceland', '2025-11-01 11:00:00', NULL),
(4, 'Berlin', 'Germany', NULL, NULL),
(5, 'Cape Town', 'South Africa', '2025-12-01 15:00:00', '2025-12-15 20:00:00'),
(5, 'Sydney', 'Australia', '2026-01-05 13:00:00', '2026-01-20 16:00:00');

-- ACTIVITIES
INSERT INTO Activity (destinationID, categoryID, title, activityDescription, website, isCompleted) VALUES
(1, 1, 'Eiffel Tower Visit', 'See the iconic Eiffel Tower.', 'https://toureiffel.paris/', TRUE),
(1, 2, 'Louvre Museum Tour', 'Explore world-famous art.', 'https://www.louvre.fr/', FALSE),
(2, 4, 'Pasta Cooking Class', 'Learn to cook Italian pasta.', NULL, TRUE),
(2, 2, 'Colosseum Tour', 'Historic Roman arena.', 'https://www.coopculture.it', FALSE),
(3, 3, 'Cherry Blossom Walk', 'Springtime walk under blossoms.', NULL, TRUE),
(3, 1, 'Mount Fuji Day Trip', 'Adventure to iconic mountain.', NULL, FALSE),
(4, 5, 'Floating Market Visit', 'Colorful Thai market experience.', NULL, TRUE),
(4, 4, 'Street Food Tour', 'Taste authentic Thai cuisine.', NULL, TRUE),
(5, 2, 'Broadway Show', 'Watch a live musical.', 'https://broadway.com', FALSE),
(5, 4, 'NYC Pizza Crawl', 'Taste the best pizza spots.', NULL, TRUE),
(6, 5, 'Niagara Falls Visit', 'Explore the famous waterfall.', NULL, TRUE),
(6, 3, 'Toronto Island Picnic', 'Relax on the islands.', NULL, FALSE),
(7, 1, 'Northern Lights Tour', 'Watch the aurora borealis.', NULL, TRUE),
(7, 5, 'Glacier Hike', 'Hike over icy terrain.', NULL, TRUE),
(8, 2, 'Berlin Wall History Walk', 'Explore Cold War history.', NULL, FALSE),
(8, 3, 'Coffee Shop Hopping', 'Relax in Berlin cafés.', NULL, TRUE),
(9, 1, 'Safari Adventure', 'Wildlife safari in Kruger.', NULL, FALSE),
(9, 4, 'Wine Tasting', 'Tour local vineyards.', NULL, TRUE),
(10, 5, 'Beach Day at Bondi', 'Swim and surf in Sydney.', NULL, TRUE),
(10, 2, 'Sydney Opera House Tour', 'Iconic performance venue.', NULL, FALSE);

-- ACTIVITY LOGS
INSERT INTO ActivityLog (activityID, createdAt, notes, photoURL) VALUES
(1, '2025-08-01 12:30:00', 'Amazing view from the top!', '/photos/eiffel.jpg'),
(3, '2025-08-15 17:00:00', 'Had fun making ravioli.', '/photos/pasta_class.jpg'),
(7, '2025-10-10 11:00:00', 'Crowded but colorful market.', '/photos/market.jpg'),
(13, '2025-11-05 23:00:00', 'Absolutely breathtaking lights.', '/photos/northern_lights.jpg'),
(20, '2026-01-10 15:30:00', 'Opera tour was fascinating.', '/photos/opera_house.jpg');