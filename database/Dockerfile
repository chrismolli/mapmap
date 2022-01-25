FROM postgres:latest

# set database passwort
ENV POSTGRES_PASSWORD=mapmap

# copy database initialization scripts
COPY *.sql /docker-entrypoint-initdb.d/

# expose postgres port
EXPOSE 5432
