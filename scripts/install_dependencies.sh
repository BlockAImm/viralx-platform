#!/bin/bash
cd /home/ec2-user/viralx-platform

# Install Node.js if not present
if ! command -v node &> /dev/null; then
    curl -sL https://rpm.nodesource.com/setup_18.x | sudo bash -
    sudo yum install -y nodejs
fi

# Install PM2 globally
sudo npm install -g pm2

# Install project dependencies
npm ci --production

# Build the Next.js application
npm run build