CREATE TABLE route
(
  callsign               VARCHAR(8) NOT NULL  PRIMARY KEY,
  number                 VARCHAR(8) NULL,
  airline_code           VARCHAR(3) NULL,
  airport_from_code VARCHAR(4) NULL,
  airport_to_code   VARCHAR(4) NULL,
  CONSTRAINT route_airline_fk FOREIGN KEY (airline_code) REFERENCES airline (code),
  CONSTRAINT route_airport_from_fk FOREIGN KEY (airport_from_code) REFERENCES airport (code),
  CONSTRAINT route_airport_to_fk FOREIGN KEY (airport_to_code) REFERENCES airport (code)
) ENGINE = InnoDB;

CREATE INDEX route_airline_fk ON route (airline_code);

CREATE INDEX route_airport_from_code_idx ON route (airport_from_code);

CREATE INDEX route_airport_to_code_idx ON route (airport_to_code);

CREATE INDEX route_number_idx ON route (number);

