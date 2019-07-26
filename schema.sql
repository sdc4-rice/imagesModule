DROP DATABASE IF EXISTS fec_images;
CREATE DATABASE fec_images;

USE fec_images;

CREATE TABLE images (
  id int AUTO_INCREMENT NOT NULL,
  path JSON,
  PRIMARY KEY (id)
);
