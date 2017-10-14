CREATE TABLE airline
(
  code              VARCHAR(3)   NOT NULL PRIMARY KEY,
  callsign          VARCHAR(255) NULL,
  iata_code         VARCHAR(2)   NULL,
  name              VARCHAR(255) NOT NULL,
  country_code VARCHAR(2)   NULL,
  CONSTRAINT airline_iata_code_unique UNIQUE (iata_code),
  CONSTRAINT airline_country_fk FOREIGN KEY (country_code) REFERENCES country (code)
) ENGINE = InnoDB;

CREATE INDEX airline_country_code_idx ON airline (country_code);

CREATE INDEX airline_iata_code_idx ON airline (iata_code);

