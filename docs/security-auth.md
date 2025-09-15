# Security and Authentication Configuration

## Overview

Implement comprehensive security measures including OAuth, password protection, and VPN access controls.

## Authentication Methods

### 1. OAuth Integration (Recommended)

#### GitHub OAuth Setup

\`\`\`php
# Wikimedia OAuth extension
wfLoadExtension('OAuth');

$wgOAuthSecretKey = 'your-secret-key';
$wgOAuthPublicKey = 'your-public-key';

# GitHub OAuth configuration
$wgOAuthConfigs['github'] = [
    'class' => 'GitHubOAuth',
    'clientId' => 'your-github-client-id',
    'clientSecret' => 'your-github-client-secret',
    'redirectUri' => 'https://mydomain.com/oauth/callback'
];
\`\`\`

#### Jupyter OAuth Setup

\`\`\`python
# Install JupyterHub with OAuth
pip install jupyterhub oauthenticator

# jupyterhub_config.py
from oauthenticator.github import GitHubOAuthenticator

c.JupyterHub.authenticator_class = GitHubOAuthenticator
c.GitHubOAuthenticator.oauth_callback_url = 'https://mydomain.com/notebook/hub/oauth-callback'
c.GitHubOAuthenticator.client_id = 'your-github-client-id'
c.GitHubOAuthenticator.client_secret = 'your-github-client-secret'
\`\`\`

### 2. Password-Based Authentication

#### Wikimedia User Management

\`\`\`php
# LocalSettings.php - Restrict registration
$wgGroupPermissions['*']['createaccount'] = false;
$wgGroupPermissions['*']['edit'] = false;
$wgGroupPermissions['user']['edit'] = true;

# Create admin user via command line
php maintenance/createAndPromote.php --force --sysop admin_username
\`\`\`

#### Jupyter Password Protection

\`\`\`python
# Generate secure password hash
from jupyter_server.auth import passwd
password_hash = passwd('your-secure-password')

# Add to jupyter config
c.ServerApp.password = password_hash
\`\`\`

### 3. VPN Security Configuration

#### OpenVPN Server Setup

\`\`\`bash
# Install OpenVPN server
sudo apt install -y openvpn easy-rsa

# Initialize PKI
make-cadir ~/openvpn-ca
cd ~/openvpn-ca
source vars
./clean-all
./build-ca
./build-key-server server
./build-dh
\`\`\`

#### Client Configuration

\`\`\`
# client.ovpn
client
dev tun
proto udp
remote your-vpn-server.com 1194
resolv-retry infinite
nobind
persist-key
persist-tun
ca ca.crt
cert client.crt
key client.key
comp-lzo
verb 3
\`\`\`

### 4. Network Security

#### Firewall Rules

\`\`\`bash
# UFW configuration
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Allow SSH (change port if needed)
sudo ufw allow 22/tcp

# Allow HTTP/HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Allow VPN
sudo ufw allow 1194/udp

# Jupyter only from VPN network
sudo ufw allow from 10.8.0.0/24 to any port 8888

# Enable firewall
sudo ufw enable
\`\`\`

#### Fail2Ban Configuration

\`\`\`ini
# /etc/fail2ban/jail.local
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 3

[sshd]
enabled = true

[nginx-http-auth]
enabled = true
filter = nginx-http-auth
logpath = /var/log/nginx/error.log

[jupyter]
enabled = true
port = 8888
filter = jupyter
logpath = /var/log/jupyter/jupyter.log
maxretry = 3
\`\`\`

### 5. SSL/TLS Configuration

#### Strong SSL Settings

\`\`\`nginx
# Strong SSL configuration
ssl_protocols TLSv1.2 TLSv1.3;
ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
ssl_prefer_server_ciphers off;
ssl_session_cache shared:SSL:10m;
ssl_session_timeout 10m;

# HSTS
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

# OCSP Stapling
ssl_stapling on;
ssl_stapling_verify on;
ssl_trusted_certificate /etc/letsencrypt/live/mydomain.com/chain.pem;
\`\`\`

## Security Checklist

- [ ] VPN server configured and running
- [ ] Firewall rules implemented
- [ ] SSL certificates installed and auto-renewing
- [ ] OAuth or strong password authentication enabled
- [ ] Fail2Ban configured for intrusion prevention
- [ ] Regular security updates scheduled
- [ ] Backup strategy implemented
- [ ] Monitoring and logging configured
