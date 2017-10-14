CREATE TABLE route
(
  callsign               VARCHAR(8) NOT NULL  PRIMARY KEY,
  number                 VARCHAR(8) NULL,
  airline_icao_code      VARCHAR(3) NULL,
  airport_from_icao_code VARCHAR(4) NULL,
  airport_to_icao_code   VARCHAR(4) NULL,
  CONSTRAINT route_airline_fk FOREIGN KEY (airline_icao_code) REFERENCES airline (icao_code),
  CONSTRAINT route_airport_from_fk FOREIGN KEY (airport_from_icao_code) REFERENCES airport (icao_code),
  CONSTRAINT route_airport_to_fk FOREIGN KEY (airport_to_icao_code) REFERENCES airport (icao_code)
) ENGINE = InnoDB;

CREATE INDEX route_airline_fk ON route (airline_icao_code);

CREATE INDEX route_airport_from_icao_code_idx ON route (airport_from_icao_code);

CREATE INDEX route_airport_to_icao_code_idx ON route (airport_to_icao_code);

CREATE INDEX route_number_idx ON route (number);

