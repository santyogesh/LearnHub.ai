# Wikimedia Installation Guide

## Overview

Install and configure Wikimedia as the primary blogging platform for educational content.

## Installation Steps

### 1. Download Wikimedia

\`\`\`bash
# Create project directory
mkdir -p /var/www/learning-platform
cd /var/www/learning-platform

# Clone Wikimedia
git clone https://github.com/wikimedia/mediawiki.git
cd mediawiki

# Install dependencies
composer install --no-dev
\`\`\`

### 2. Database Setup

\`\`\`bash
# Install MySQL/MariaDB
sudo apt install -y mariadb-server

# Secure installation
sudo mysql_secure_installation

# Create database
sudo mysql -u root -p
\`\`\`

\`\`\`sql
CREATE DATABASE wikimedia_blog;
CREATE USER 'wiki_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON wikimedia_blog.* TO 'wiki_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
\`\`\`

### 3. Wikimedia Configuration

\`\`\`php
# LocalSettings.php
<?php
$wgSitename = "Learning Blog Platform";
$wgMetaNamespace = "Learning_Blog_Platform";

# Database settings
$wgDBtype = "mysql";
$wgDBserver = "localhost";
$wgDBname = "wikimedia_blog";
$wgDBuser = "wiki_user";
$wgDBpassword = "secure_password";

# Security
$wgSecretKey = "generate-random-64-char-string";
$wgUpgradeKey = "generate-random-16-char-string";

# Enable uploads
$wgEnableUploads = true;
$wgUseImageMagick = true;
$wgImageMagickConvertCommand = "/usr/bin/convert";

# Extensions for notebook integration
wfLoadExtension('ParserFunctions');
wfLoadExtension('Widgets');
wfLoadExtension('EmbedVideo');

# Custom extension for Jupyter integration
require_once "$IP/extensions/JupyterIntegration/JupyterIntegration.php";
?>
\`\`\`

### 4. PAWS Integration Setup

\`\`\`bash
# Install PAWS extension
cd /var/www/learning-platform/mediawiki/extensions
git clone https://github.com/wikimedia/mediawiki-extensions-PAWS.git PAWS

# Configure PAWS
echo '$wgPAWSURL = "https://mydomain.com/notebook";' >> ../LocalSettings.php
echo 'wfLoadExtension("PAWS");' >> ../LocalSettings.php
\`\`\`

### 5. File Permissions

\`\`\`bash
# Set proper ownership
sudo chown -R www-data:www-data /var/www/learning-platform
sudo chmod -R 755 /var/www/learning-platform

# Make cache and images writable
sudo chmod -R 777 /var/www/learning-platform/mediawiki/cache
sudo chmod -R 777 /var/www/learning-platform/mediawiki/images
