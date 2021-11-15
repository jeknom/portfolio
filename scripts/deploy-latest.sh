#!/bin/bash
docker pull jeknom/portfolio-alpine:latest
docker container stop portfolio-app
docker container rm portfolio-app
docker-compose -f docker-compose.prod.yml up -d