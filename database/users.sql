DROP TABLE IF EXISTS  users;

CREATE TABLE users (
 id serial PRIMARY KEY,
 username varchar(200) NOT NULL UNIQUE,
 email varchar (200) NOT NULL UNIQUE,
 user_password varchar(500) NOT NULL
);
