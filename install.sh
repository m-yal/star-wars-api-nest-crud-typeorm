#!/bin/bash
 
# Phase 1
# mkdir -p certbot/data
# docker compose -f ./docker-compose-initiate.yaml up -d nginx
# docker compose -f ./docker-compose-initiate.yaml up certbot
# docker compose -f ./docker-compose-initiate.yaml down
 
# some configurations for let's encrypt
sudo curl -L --create-dirs -o etc/letsencrypt/options-ssl-nginx.conf https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf
sudo openssl dhparam -out etc/letsencrypt/ssl-dhparams.pem 2048
 
# Phase 2
# crontab ./etc/crontab
# docker compose -f ./docker-compose.yaml -d up