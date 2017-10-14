CREATE TABLE aircraft
(
  code         VARCHAR(6)   NOT NULL PRIMARY KEY,
  model        VARCHAR(255) NULL,
  registration VARCHAR(255) NULL,
  selcal       VARCHAR(255) NULL,
  type         VARCHAR(4)   NULL,
  CONSTRAINT aircraft_type_fk FOREIGN KEY (type) REFERENCES aircraft_type (type)
);

CREATE INDEX aircraft_registration_idx ON aircraft (registration);

CREATE INDEX aircraft_selcal_idx ON aircraft (selcal);

CREATE INDEX aircraft_type_idx ON aircraft (type);

