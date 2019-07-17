DROP DATABASE IF EXISTS fecimage;
CREATE DATABASE fecimage;

USE fecimage;

CREATE TABLE images (
  id int AUTO_INCREMENT NOT NULL,
  path JSON,
  PRIMARY KEY (id)
);
