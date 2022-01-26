# mapmap
Experimenting with Containerization, Microservices and REST APIs.

<p align="center">
  <img src="img/preview.png" align="center" width="512">
  A view of the frontend.
</p>

## Description
This project was built in order to get some hands-on experience with docker, postgres and flask. It creates a set of random locations, that are queried from the database, processed by the backend service and parsed to the frontend application.

The architecture is as following:
<br>
```
[postgres/db] <- 1 -> [py/backend] <- 2 -> [nginx/frontend]
1 psql
2 flask
```

## Installation
1. Run ```docker-compose build && docker-compose up``` to start the application.
2. Connect to the frontend using ```localhost:8180```
