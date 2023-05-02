#!/bin/bash

sudo chown -R $(whoami):$(whoami) .
docker compose -f ./docker-compose.yml up