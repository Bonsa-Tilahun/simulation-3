DROP TABLE IF EXISTS users
DROP TABLE IF EXISTS post

CREATE TABLE users (
    id serial PRIMARY KEY,
    username VARCHAR(20),
    password VARCHAR(20),
    profile_pic TEXT
)

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(45),
    img TEXT,
    content TEXT,
    author_id INT REFERENCES users(id)
)

ALTER TABLE users 
ALTER COLUMN password TEXT;