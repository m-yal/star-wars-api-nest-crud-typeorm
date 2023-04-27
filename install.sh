#!/bin/bash
 
# Phase 1
mkdir -p certbot/data
docker compose -f ./docker-compose-initiate.yml up -d nginx
docker compose -f ./docker-compose-initiate.yml up certbot
docker compose -f ./docker-compose-initiate.yml down
 
# some configurations for let's encrypt
sudo curl -L --create-dirs -o etc/letsencrypt/options-ssl-nginx.conf https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf
sudo openssl dhparam -out etc/letsencrypt/ssl-dhparams.pem 2048
 
# Phase 2
chmod +x etc/crontab
crontab ./etc/crontab
docker compose -f ./docker-compose.yml -d up