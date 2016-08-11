CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(40),
  last_name VARCHAR(40),
  email VARCHAR(40),
  address VARCHAR(300),
  admin BOOLEAN
);

CREATE TABLE facebooks (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id)
);

CREATE TABLE composers (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  year_born INTEGER,
  year_died INTEGER,
  country_of_origin VARCHAR(50)
);

CREATE TABLE works (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100),
  composer_id INTEGER REFERENCES composers(id),
  instrumentation VARCHAR(50)[],
  catalog VARCHAR(20),
  workNumber INTEGER,
  year_composed INTEGER,
  style VARCHAR(50),
  pdf_url VARCHAR(500),
  cover_url VARCHAR(500),
  package VARCHAR(20),
  price_print MONEY,
  price_pdf MONEY,
  price_mixed MONEY,
  collection VARCHAR(40),
  tags
);

CREATE TABLE purchases (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  order_date TIMESTAMP with time zone
);

CREATE TABLE purchase_lines (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES purchases(id),
  work_id INTEGER REFERENCES works(id),
  quantity INTEGER,
  package VARCHAR(20)
);

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  work_id INTEGER REFERENCES works(id),
  user_id INTEGER REFERENCES users(id),
  rating INTEGER,
  review TEXT
);

CREATE TABLE submissions (
  id SERIAL PRIMARY KEY,
  date_submitted TIMESTAMP with time zone,
  title VARCHAR(100),
  composerFirst VARCHAR(50),
  composerLast VARCHAR(50),
  cover_url VARCHAR(500),
  score_url VARCHAR(500),
  parts_url VARCHAR(500),
  template VARCHAR(50),
  price_print MONEY,
  price_pdf MONEY,
  price_mixed MONEY,
  package VARCHAR(20),
  accepted BOOLEAN,
  date_accepted TIMESTAMP with time zone
)
