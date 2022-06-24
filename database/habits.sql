DROP TABLE IF EXISTS  habits;

CREATE TABLE habits (
 id serial PRIMARY KEY,
 habit varchar(255),
 frequency varchar(255),
 data DATE,
 user_id int
)
