# Deployment and Maintenance Guide

## Overview

Step-by-step deployment instructions and best practices for maintaining your learning blog platform.

## Deployment Steps

### 1. Server Preparation

\`\`\`bash
# Initial server setup
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl wget git unzip

# Create deployment user
sudo adduser deploy
sudo usermod -aG sudo deploy
sudo su - deploy
\`\`\`

### 2. Automated Deployment Script

\`\`\`bash
#!/bin/bash
# deploy.sh - Automated deployment script

set -e

echo "Starting Learning Blog Platform Deployment..."

# Variables
DOMAIN="mydomain.com"
DB_PASSWORD=$(openssl rand -base64 32)
WIKI_SECRET=$(openssl rand -base64 64)
JUPYTER_PASSWORD=$(openssl rand -base64 16)

# Update system
sudo apt update && sudo apt upgrade -y

# Install dependencies
sudo apt install -y nginx mariadb-server php8.1-fpm php8.1-mysql php8.1-xml php8.1-mbstring php8.1-curl php8.1-gd composer python3 python3-pip python3-venv

# Setup database
sudo mysql -e "CREATE DATABASE wikimedia_blog;"
sudo mysql -e "CREATE USER 'wiki_user'@'localhost' IDENTIFIED BY '$DB_PASSWORD';"
sudo mysql -e "GRANT ALL PRIVILEGES ON wikimedia_blog.* TO 'wiki_user'@'localhost';"
sudo mysql -e "FLUSH PRIVILEGES;"

# Install Wikimedia
cd /var/www
sudo git clone https://github.com/wikimedia/mediawiki.git learning-platform
cd learning-platform
sudo composer install --no-dev

# Configure Wikimedia
sudo cp LocalSettings.php.template LocalSettings.php
sudo sed -i "s/DB_PASSWORD_PLACEHOLDER/$DB_PASSWORD/g" LocalSettings.php
sudo sed -i "s/SECRET_KEY_PLACEHOLDER/$WIKI_SECRET/g" LocalSettings.php

# Setup Jupyter
python3 -m venv /opt/jupyter-env
source /opt/jupyter-env/bin/activate
pip install jupyter jupyterlab

# Generate Jupyter config
jupyter notebook --generate-config
JUPYTER_HASH=$(python3 -c "from notebook.auth import passwd; print(passwd('$JUPYTER_PASSWORD'))")
echo "c.NotebookApp.password = '$JUPYTER_HASH'" >> ~/.jupyter/jupyter_notebook_config.py

# Setup Nginx
sudo cp nginx.conf /etc/nginx/sites-available/learning-platform
sudo ln -s /etc/nginx/sites-available/learning-platform /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# SSL Certificate
sudo certbot --nginx -d $DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN

# Set permissions
sudo chown -R www-data:www-data /var/www/learning-platform
sudo chmod -R 755 /var/www/learning-platform

echo "Deployment completed!"
echo "Database password: $DB_PASSWORD"
echo "Jupyter password: $JUPYTER_PASSWORD"
echo "Please save these credentials securely!"
\`\`\`

### 3. Docker Deployment (Alternative)

\`\`\`yaml
# docker-compose.yml
version: '3.8'

services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/ssl
    depends_on:
      - wikimedia
      - jupyter

  wikimedia:
    build: ./wikimedia
    volumes:
      - ./wikimedia:/var/www/html
      - ./uploads:/var/www/html/images
    environment:
      - DB_HOST=mariadb
      - DB_NAME=wikimedia_blog
      - DB_USER=wiki_user
      - DB_PASSWORD=${DB_PASSWORD}

  jupyter:
    build: ./jupyter
    ports:
      - "8888:8888"
    volumes:
      - ./notebooks:/home/jovyan/work
    environment:
      - JUPYTER_ENABLE_LAB=yes

  mariadb:
    image: mariadb:10.6
    environment:
      - MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD}
      - MYSQL_DATABASE=wikimedia_blog
      - MYSQL_USER=wiki_user
      - MYSQL_PASSWORD=${DB_PASSWORD}
    volumes:
      - mariadb_data:/var/lib/mysql

volumes:
  mariadb_data:
\`\`\`

## Maintenance Tasks

### 1. Regular Updates

\`\`\`bash
#!/bin/bash
# update.sh - Regular maintenance script

# Update system packages
sudo apt update && sudo apt upgrade -y

# Update Wikimedia
cd /var/www/learning-platform
sudo git pull origin master
sudo composer update --no-dev

# Update Jupyter
source /opt/jupyter-env/bin/activate
pip install --upgrade jupyter jupyterlab

# Restart services
sudo systemctl restart nginx php8.1-fpm jupyter

echo "System updated successfully!"
\`\`\`

### 2. Backup Strategy

\`\`\`bash
#!/bin/bash
# backup.sh - Automated backup script

BACKUP_DIR="/opt/backups/$(date +%Y%m%d_%H%M%S)"
mkdir -p $BACKUP_DIR

# Database backup
mysqldump -u wiki_user -p$DB_PASSWORD wikimedia_blog > $BACKUP_DIR/database.sql

# Files backup
tar -czf $BACKUP_DIR/wikimedia_files.tar.gz /var/www/learning-platform
tar -czf $BACKUP_DIR/notebooks.tar.gz /opt/notebooks

# Configuration backup
cp -r /etc/nginx/sites-available $BACKUP_DIR/
cp ~/.jupyter/jupyter_notebook_config.py $BACKUP_DIR/

# Upload to cloud storage (optional)
# aws s3 sync $BACKUP_DIR s3://your-backup-bucket/

echo "Backup completed: $BACKUP_DIR"
\`\`\`

### 3. Monitoring Setup

\`\`\`bash
# Install monitoring tools
sudo apt install -y htop iotop nethogs

# Setup log rotation
sudo tee /etc/logrotate.d/learning-platform << EOF
/var/log/nginx/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 www-data adm
    postrotate
        systemctl reload nginx
    endscript
}
EOF
\`\`\`

### 4. Performance Optimization

\`\`\`bash
# PHP-FPM optimization
sudo tee -a /etc/php/8.1/fpm/pool.d/www.conf << EOF
pm.max_children = 50
pm.start_servers = 5
pm.min_spare_servers = 5
pm.max_spare_servers = 35
pm.max_requests = 500
EOF

# Nginx optimization
sudo tee -a /etc/nginx/nginx.conf << EOF
worker_processes auto;
worker_connections 1024;
keepalive_timeout 65;
gzip on;
gzip_types text/plain text/css application/json application/javascript;
EOF

# MariaDB optimization
sudo tee -a /etc/mysql/mariadb.conf.d/50-server.cnf << EOF
innodb_buffer_pool_size = 256M
query_cache_size = 32M
query_cache_limit = 2M
EOF
\`\`\`

## Scaling Considerations

### 1. Load Balancing

\`\`\`nginx
# Load balancer configuration
upstream wikimedia_backend {
    server 192.168.1.10:80;
    server 192.168.1.11:80;
}

upstream jupyter_backend {
    server 192.168.1.10:8888;
    server 192.168.1.11:8888;
}
\`\`\`

### 2. Database Clustering

\`\`\`bash
# MariaDB Galera Cluster setup
sudo apt install -y mariadb-server galera-4 mariadb-client

# Configure cluster
sudo tee /etc/mysql/mariadb.conf.d/galera.cnf << EOF
[galera]
wsrep_on=ON
wsrep_provider=/usr/lib/galera/libgalera_smm.so
wsrep_cluster_address="gcomm://node1,node2,node3"
binlog_format=row
default_storage_engine=InnoDB
innodb_autoinc_lock_mode=2
EOF
\`\`\`

### 3. CDN Integration

\`\`\`nginx
# CloudFlare integration
location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
    add_header X-Served-By "origin";
}
\`\`\`

## Troubleshooting Guide

### Common Issues

1. **Jupyter not accessible**: Check VPN connection and firewall rules
2. **Wikimedia database errors**: Verify database credentials and connectivity
3. **SSL certificate issues**: Ensure domain DNS is properly configured
4. **Performance problems**: Monitor resource usage and optimize configurations

### Log Locations

- Nginx: `/var/log/nginx/`
- PHP-FPM: `/var/log/php8.1-fpm.log`
- Jupyter: `~/.jupyter/jupyter.log`
- MariaDB: `/var/log/mysql/`

This comprehensive deployment guide ensures a robust, scalable, and maintainable learning blog platform with integrated Jupyter notebook support.
