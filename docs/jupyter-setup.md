# Jupyter Notebook Server Configuration

## Overview

Configure Jupyter Notebook server with VPN access and secure authentication.

## Installation Steps

### 1. Jupyter Server Setup

\`\`\`bash
# Install Python and Jupyter
sudo apt install -y python3 python3-pip python3-venv

# Create virtual environment
python3 -m venv /opt/jupyter-env
source /opt/jupyter-env/bin/activate

# Install Jupyter and extensions
pip install jupyter jupyterlab notebook
pip install jupyter-collaboration jupyter-server-proxy
\`\`\`

### 2. Jupyter Configuration

\`\`\`bash
# Generate config
jupyter notebook --generate-config

# Create password hash
python3 -c "from notebook.auth import passwd; print(passwd())"
\`\`\`

\`\`\`python
# ~/.jupyter/jupyter_notebook_config.py
c = get_config()

# Network configuration
c.NotebookApp.ip = '0.0.0.0'
c.NotebookApp.port = 8888
c.NotebookApp.open_browser = False
c.NotebookApp.allow_remote_access = True

# Security
c.NotebookApp.password = 'sha1:your-generated-hash'
c.NotebookApp.token = ''
c.NotebookApp.disable_check_xsrf = False

# SSL (if not using reverse proxy SSL)
# c.NotebookApp.certfile = '/path/to/cert.pem'
# c.NotebookApp.keyfile = '/path/to/key.pem'

# Notebook directory
c.NotebookApp.notebook_dir = '/opt/notebooks'

# Allow embedding in iframes (for Wikimedia integration)
c.NotebookApp.tornado_settings = {
    'headers': {
        'Content-Security-Policy': "frame-ancestors 'self' https://mydomain.com"
    }
}
\`\`\`

### 3. Systemd Service

\`\`\`ini
# /etc/systemd/system/jupyter.service
[Unit]
Description=Jupyter Notebook Server
After=network.target

[Service]
Type=simple
User=jupyter
Group=jupyter
WorkingDirectory=/opt/notebooks
Environment=PATH=/opt/jupyter-env/bin
ExecStart=/opt/jupyter-env/bin/jupyter notebook
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
\`\`\`

\`\`\`bash
# Create jupyter user
sudo useradd -r -s /bin/bash jupyter
sudo mkdir -p /opt/notebooks
sudo chown jupyter:jupyter /opt/notebooks

# Enable service
sudo systemctl daemon-reload
sudo systemctl enable jupyter
sudo systemctl start jupyter
\`\`\`

### 4. VPN Configuration

\`\`\`bash
# Install OpenVPN (example)
sudo apt install -y openvpn

# Configure VPN client
sudo cp client.ovpn /etc/openvpn/client.conf

# Enable VPN service
sudo systemctl enable openvpn@client
sudo systemctl start openvpn@client
\`\`\`

### 5. Firewall Rules

\`\`\`bash
# Allow only VPN traffic to Jupyter
sudo ufw allow from 10.8.0.0/24 to any port 8888
sudo ufw deny 8888

# Allow SSH and HTTP/HTTPS
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443

sudo ufw enable
