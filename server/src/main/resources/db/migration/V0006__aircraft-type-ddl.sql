CREATE TABLE aircraft_type
(
  type           VARCHAR(4)   NOT NULL PRIMARY KEY,
  classification VARCHAR(255) NULL,
  manufacturer   VARCHAR(255) NULL,
  model          VARCHAR(255) NULL
);

CREATE INDEX aircraft_type_classification_idx ON aircraft_type (classification);

CREATE INDEX aircraft_type_manufacturer_idx ON aircraft_type (manufacturer);

