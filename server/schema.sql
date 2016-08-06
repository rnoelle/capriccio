CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(40),
  last_name VARCHAR(40),
  email VARCHAR(40),
  address VARCHAR(300)
)

CREATE TABLE facebooks (
  id SERIAL PRIMARY KEY,
  user_id 
)
