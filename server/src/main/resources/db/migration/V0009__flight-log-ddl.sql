CREATE TABLE flight_log
(
  id        INT   NOT NULL AUTO_INCREMENT PRIMARY KEY,
  flight_id INT   NOT NULL,
  altitide  INT   NULL,
  heading   INT   NULL,
  latitude  FLOAT NULL,
  longitude FLOAT NULL,
  speed     INT   NULL,
  CONSTRAINT flight_log_flight_fk FOREIGN KEY (flight_id) REFERENCES flight (id)
);

CREATE INDEX flight_log_flight_idx ON flight_log (flight_id);

