CREATE TABLE aircraft
(
  code         VARCHAR(6)   NOT NULL PRIMARY KEY,
  airline_code VARCHAR(3)   NULL,
  reg          VARCHAR(16)  NULL,
  reg_compact  VARCHAR(16)  NULL,
  type         VARCHAR(4)   NULL,
  model        VARCHAR(255) NULL,
  CONSTRAINT aircraft_type_fk FOREIGN KEY (type) REFERENCES aircraft_type (type),
  CONSTRAINT aircraft_airline_fk FOREIGN KEY (airline_code) REFERENCES airline (code)
);

CREATE INDEX aircraft_airline_code_idx ON aircraft (airline_code);

CREATE INDEX aircraft_reg_compact_idx ON aircraft (reg_compact);

CREATE INDEX aircraft_type_idx ON aircraft (type);

