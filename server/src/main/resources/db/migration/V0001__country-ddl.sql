CREATE TABLE country
(
  iso2_code VARCHAR(2)   NOT NULL PRIMARY KEY,
  iso3_code VARCHAR(3)   NOT NULL,
  name      VARCHAR(255) NOT NULL,
  CONSTRAINT country_iso3_code_unique UNIQUE (iso3_code)
) ENGINE = InnoDB;

CREATE INDEX country_iso3_code_idx
  ON country (iso3_code);

