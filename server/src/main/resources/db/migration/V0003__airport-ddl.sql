CREATE TABLE airport
(
  icao_code         VARCHAR(4)   NOT NULL PRIMARY KEY,
  city              VARCHAR(255) NULL,
  iata_code         VARCHAR(3)   NULL,
  name              VARCHAR(255) NOT NULL,
  country_iso2_code VARCHAR(2)   NOT NULL,
  CONSTRAINT airport_iata_code_unique UNIQUE (iata_code),
  CONSTRAINT airport_country_fk FOREIGN KEY (country_iso2_code) REFERENCES country (iso2_code)
) ENGINE = InnoDB;

CREATE INDEX airport_country_iso2_code_idx ON airport (country_iso2_code);

CREATE INDEX airport_iata_code_idx ON airport (iata_code);

