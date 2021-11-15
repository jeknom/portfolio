#!/bin/bash

# Install docker and compose
apt-get update -y
apt-get install -y apt-transport-https ca-certificates curl gnupg lsb-release
curl -fsSL https://download.docker.com/linux/ubuntu/gpg |  gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
apt-get update
apt-get install docker-ce docker-ce-cli containerd.io
curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose

# Create user for the portfolio
adduser portfolio
usermod -aG docker portfolio

# Initialize files
cd /home/portfolio
mkdir database
touch .env
touch nginx.conf
wget -O nginx.conf https://raw.githubusercontent.com/jeknom/portfolio/main/nginx.conf
wget -O docker-compose.prod.yml https://raw.githubusercontent.com/jeknom/portfolio/main/docker-compose.prod.yml
wget -O docker-compose.yml https://raw.githubusercontent.com/jeknom/portfolio/main/docker-compose.yml
cd /home/portfolio/database
mkdir container
mkdir initialization
cd /home/portfolio/database/initialization
wget -O schema.sql https://raw.githubusercontent.com/jeknom/portfolio/main/database/initialization/schema.sql
chown -R portfolio /home/portfolio

# Create certificates
snap install core
snap refresh core
snap install --classic certbot
ln -s /snap/bin/certbot /usr/bin/certbot
certbot certonly --standalone