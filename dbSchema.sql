CREATE TABLE Images (
  id serial,
  data BYTEA UNIQUE,
  PRIMARY KEY (id)
);

CREATE TABLE Maintainers (
  id serial,
  name TEXT NOT NULL,
  bio TEXT NOT NULL,
  image_id INTEGER,
  PRIMARY KEY (id),
  FOREIGN KEY (image_id) REFERENCES Images (id),
  CHECK (id = 1)
);

CREATE TABLE Skills (
  id serial,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  rank INTEGER,
  image_id INTEGER,
  PRIMARY KEY (id),
  FOREIGN KEY (image_id) REFERENCES Images (id),
  CHECK (rank BETWEEN 1 AND 5)
);

CREATE TABLE Achievements (
  id serial,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  date TIMESTAMP NOT NULL,
  image_id INTEGER,
  PRIMARY KEY (id),
  FOREIGN KEY (image_id) REFERENCES Images (id)
);

CREATE TABLE Highlights (
  id serial,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  date TIMESTAMP NOT NULL,
  image_id INTEGER,
  PRIMARY KEY (id),
  FOREIGN KEY (image_id) REFERENCES Images (id)
);