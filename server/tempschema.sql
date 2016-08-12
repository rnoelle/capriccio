CREATE TABLE logins (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  time TIMESTAMP with time zone
);
