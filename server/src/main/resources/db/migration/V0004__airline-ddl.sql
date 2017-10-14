CREATE TABLE airline
(
  icao_code         VARCHAR(3)   NOT NULL PRIMARY KEY,
  callsign          VARCHAR(255) NULL,
  iata_code         VARCHAR(2)   NULL,
  name              VARCHAR(255) NOT NULL,
  country_iso2_code VARCHAR(2)   NULL,
  CONSTRAINT airline_iata_code_unique UNIQUE (iata_code),
  CONSTRAINT airline_country_fk FOREIGN KEY (country_iso2_code) REFERENCES country (iso2_code)
) ENGINE = InnoDB;

CREATE INDEX airline_country_iso2_code_idx ON airline (country_iso2_code);

CREATE INDEX airline_iata_code_idx ON airline (iata_code);

