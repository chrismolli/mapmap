CREATE DATABASE mapmap;

CREATE USER backend WITH ENCRYPTED PASSWORD 'backend';
GRANT ALL PRIVILEGES ON DATABASE mapmap TO backend;

\c mapmap;

CREATE TABLE entries (
    id serial PRIMARY KEY,
    lat real,
    lng real,
    consumption real,
    production real,
    total_capacity real,
    avail_capacity real
);

GRANT ALL PRIVILEGES ON entries TO backend;