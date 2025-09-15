# Public Learning Blog Platform with Jupyter Integration

A comprehensive platform combining Wikimedia-based blogging with interactive Jupyter notebook support, designed for educational content creation and sharing.

## Architecture Overview

\`\`\`
Internet → Domain (mydomain.com)
├── / → Wikimedia Blog (Public)
└── /notebook → Jupyter Server (VPN + Auth)
\`\`\`

## System Components

1. **Frontend**: Wikimedia-based blog platform
2. **Backend**: Jupyter Notebook server (Ubuntu + VPN)
3. **Proxy**: Nginx reverse proxy with SSL
4. **Security**: OAuth/Password authentication + VPN access

## Quick Start

1. [Server Setup](#server-setup)
2. [Wikimedia Installation](#wikimedia-installation)
3. [Jupyter Configuration](#jupyter-configuration)
4. [Reverse Proxy Setup](#reverse-proxy-setup)
5. [Security Configuration](#security-configuration)

---

## Detailed Setup Instructions

### Prerequisites

- Ubuntu 20.04+ server with root access
- Domain name with DNS control
- VPN server setup (OpenVPN/WireGuard)
- SSL certificate (Let's Encrypt recommended)

### Server Setup

\`\`\`bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install required packages
sudo apt install -y nginx docker.io docker-compose git curl wget

# Enable services
sudo systemctl enable nginx docker
sudo systemctl start nginx docker
