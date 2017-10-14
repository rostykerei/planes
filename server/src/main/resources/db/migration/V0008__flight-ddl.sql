CREATE TABLE flight
(
  id             INT        NOT NULL AUTO_INCREMENT PRIMARY KEY,
  aircraft_code  VARCHAR(6) NOT NULL,
  route_callsign VARCHAR(8) NOT NULL,
  first_contact  DATETIME   NOT NULL,
  last_contact   DATETIME   NOT NULL,
  CONSTRAINT flight_aircraft_fk FOREIGN KEY (aircraft_code) REFERENCES aircraft (code),
  CONSTRAINT flight_route_fk FOREIGN KEY (route_callsign) REFERENCES route (callsign)
);

CREATE INDEX flight_aircraft_code_idx ON flight (aircraft_code);

CREATE INDEX flight_route_callsign_idx ON flight (route_callsign);

CREATE INDEX flight_first_contact_idx ON flight (first_contact);

CREATE INDEX flight_last_contact_idx ON flight (last_contact);


