DELETE FROM users_roles;
DELETE FROM roles;
DELETE FROM users;
DELETE FROM events;

ALTER TABLE users AUTO_INCREMENT = 1;
ALTER TABLE roles AUTO_INCREMENT = 1;
ALTER TABLE users_roles AUTO_INCREMENT = 1;
ALTER TABLE events AUTO_INCREMENT = 1;
