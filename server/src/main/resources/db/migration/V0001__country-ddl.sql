CREATE TABLE country
(
  iso2_code VARCHAR(2)   NOT NULL PRIMARY KEY,
  iso3_code VARCHAR(3)   NOT NULL,
  name      VARCHAR(255) NOT NULL,
  CONSTRAINT country_iso3_uidx UNIQUE (iso3_code)
);