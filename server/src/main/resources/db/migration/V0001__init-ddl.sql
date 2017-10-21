-- COUNTRY --

CREATE TABLE country
(
  code VARCHAR(2)   NOT NULL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
)
  ENGINE = InnoDB;

-- STATUS --

CREATE TABLE status
(
  name        VARCHAR(16)  NOT NULL PRIMARY KEY,
  description VARCHAR(255) NOT NULL
)
  ENGINE = InnoDB;

-- AIRPORT --

CREATE TABLE airport
(
  code         VARCHAR(4)   NOT NULL PRIMARY KEY,
  iata_code    VARCHAR(3)   NULL,
  country      VARCHAR(2)   NOT NULL,
  city         VARCHAR(255) NULL,
  name         VARCHAR(255) NOT NULL,
  latitude     FLOAT        NOT NULL,
  longitude    FLOAT        NOT NULL,
  status       VARCHAR(16)  NOT NULL,
  last_updated DATETIME     NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT airport_iata_code_unique UNIQUE (iata_code),
  CONSTRAINT airport_country_fk FOREIGN KEY (country) REFERENCES country (code),
  CONSTRAINT airport_status_fk FOREIGN KEY (status) REFERENCES status (name)
)
  ENGINE = InnoDB;

CREATE INDEX airport_iata_code_idx
  ON airport (iata_code);

CREATE INDEX airport_country_idx
  ON airport (country);

-- AIRLINE --

CREATE TABLE airline
(
  code         VARCHAR(3)   NOT NULL PRIMARY KEY,
  iata_code    VARCHAR(2)   NULL,
  country      VARCHAR(2)   NULL,
  name         VARCHAR(255) NOT NULL,
  callsign     VARCHAR(255) NULL,
  status       VARCHAR(16)  NOT NULL,
  last_updated DATETIME     NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT airline_iata_code_unique UNIQUE (iata_code),
  CONSTRAINT airline_country_fk FOREIGN KEY (country) REFERENCES country (code),
  CONSTRAINT airline_status_fk FOREIGN KEY (status) REFERENCES status (name)
)
  ENGINE = InnoDB;

CREATE INDEX airline_country_idx
  ON airline (country);

CREATE INDEX airline_iata_code_idx
  ON airline (iata_code);

-- ROUTE --

CREATE TABLE route
(
  callsign     VARCHAR(8)  NOT NULL  PRIMARY KEY,
  number       VARCHAR(8)  NULL,
  airline      VARCHAR(3)  NULL,
  airport_from VARCHAR(4)  NULL,
  airport_to   VARCHAR(4)  NULL,
  status       VARCHAR(16) NOT NULL,
  last_updated DATETIME    NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT route_airline_fk FOREIGN KEY (airline) REFERENCES airline (code),
  CONSTRAINT route_airport_from_fk FOREIGN KEY (airport_from) REFERENCES airport (code),
  CONSTRAINT route_airport_to_fk FOREIGN KEY (airport_to) REFERENCES airport (code),
  CONSTRAINT route_status_fk FOREIGN KEY (status) REFERENCES status (name)
)
  ENGINE = InnoDB;

CREATE INDEX route_airline_fk
  ON route (airline);

CREATE INDEX route_number_idx
  ON route (number);

CREATE INDEX route_airport_from_idx
  ON route (airport_from);

CREATE INDEX route_airport_to_idx
  ON route (airport_to);

-- AIRCRAFT TYPE --

CREATE TABLE aircraft_type
(
  type           VARCHAR(4)   NOT NULL PRIMARY KEY,
  manufacturer   VARCHAR(255) NULL,
  model          VARCHAR(255) NULL,
  classification VARCHAR(255) NULL,
  status         VARCHAR(16)  NOT NULL,
  last_updated   DATETIME     NOT NULL ON UPDATE CURRENT_TIMESTAMP
)
  ENGINE = InnoDB;

CREATE INDEX aircraft_type_classification_idx
  ON aircraft_type (classification);

CREATE INDEX aircraft_type_manufacturer_idx
  ON aircraft_type (manufacturer);

-- AIRCRAFT --

CREATE TABLE aircraft
(
  code         VARCHAR(6)   NOT NULL PRIMARY KEY,
  airline      VARCHAR(3)   NULL,
  reg          VARCHAR(16)  NULL,
  reg_compact  VARCHAR(16)  NULL,
  type         VARCHAR(4)   NULL,
  model        VARCHAR(255) NULL,
  status       VARCHAR(16)  NOT NULL,
  last_updated DATETIME     NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT aircraft_type_fk FOREIGN KEY (type) REFERENCES aircraft_type (type),
  CONSTRAINT aircraft_airline_fk FOREIGN KEY (airline) REFERENCES airline (code),
  CONSTRAINT aircraft_status_fk FOREIGN KEY (status) REFERENCES status (name)
)
  ENGINE = InnoDB;

CREATE INDEX aircraft_airline_code_idx
  ON aircraft (airline);

CREATE INDEX aircraft_reg_compact_idx
  ON aircraft (reg_compact);

CREATE INDEX aircraft_type_idx
  ON aircraft (type);

-- FLIGHT --

CREATE TABLE flight
(
  id            INT        NOT NULL AUTO_INCREMENT PRIMARY KEY,
  aircraft      VARCHAR(6) NOT NULL,
  route         VARCHAR(8) NULL,
  first_contact DATETIME   NOT NULL,
  last_contact  DATETIME   NOT NULL,
  CONSTRAINT flight_aircraft_fk FOREIGN KEY (aircraft) REFERENCES aircraft (code),
  CONSTRAINT flight_route_fk FOREIGN KEY (route) REFERENCES route (callsign)
)
  ENGINE = InnoDB;

CREATE INDEX flight_aircraft_idx
  ON flight (aircraft);

CREATE INDEX flight_route_idx
  ON flight (route);

CREATE INDEX flight_first_contact_idx
  ON flight (first_contact);

CREATE INDEX flight_last_contact_idx
  ON flight (last_contact);

-- FLIGHT LOG --

CREATE TABLE flight_log
(
  id            INT   NOT NULL AUTO_INCREMENT PRIMARY KEY,
  flight        INT   NOT NULL,
  altitide      INT   NULL,
  heading       INT   NULL,
  vertical_rate INT   NULL,
  latitude      FLOAT NULL,
  longitude     FLOAT NULL,
  speed         INT   NULL,
  CONSTRAINT flight_log_flight_fk FOREIGN KEY (flight) REFERENCES flight (id)
)
  ENGINE = InnoDB;

CREATE INDEX flight_log_flight_idx
  ON flight_log (flight);




