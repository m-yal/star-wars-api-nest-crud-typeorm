#!/bin/bash
 
echo "### Phase 1: generating initial certificate"
mkdir -p certbot/data
sudo chown -R $(whoami):$(whoami) .
docker compose -f ./docker-compose-initiate.yml up -d nginx
docker compose -f ./docker-compose-initiate.yml up certbot
docker compose -f ./docker-compose-initiate.yml down
sudo chown -R $(whoami):$(whoami) .

echo "### Phase 2: setting some configurations for let's encrypt"
sudo curl -L --create-dirs -o etc/letsencrypt/options-ssl-nginx.conf https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf
sudo openssl dhparam -out etc/letsencrypt/ssl-dhparams.pem 2048
 
echo "### Phase 3: launching production docker compose"
crontab ./etc/crontab
sudo chown -R $(whoami):$(whoami) .
docker compose -f ./docker-compose.yml up