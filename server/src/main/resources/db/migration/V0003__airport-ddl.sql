CREATE TABLE airport
(
  code              VARCHAR(4)   NOT NULL PRIMARY KEY,
  city              VARCHAR(255) NULL,
  iata_code         VARCHAR(3)   NULL,
  name              VARCHAR(255) NOT NULL,
  country_code VARCHAR(2)   NOT NULL,
  CONSTRAINT airport_iata_code_unique UNIQUE (iata_code),
  CONSTRAINT airport_country_fk FOREIGN KEY (country_code) REFERENCES country (code)
) ENGINE = InnoDB;

CREATE INDEX airport_country_code_idx ON airport (country_code);

CREATE INDEX airport_iata_code_idx ON airport (iata_code);

