#!/bin/bash
cd /home/ec2-user/viralx-platform

# Copy environment variables from AWS Systems Manager Parameter Store
aws ssm get-parameters-by-path \
  --path "/viralx/" \
  --with-decryption \
  --query "Parameters[*].[Name,Value]" \
  --output text | while read -r name value; do
    key=$(echo $name | sed 's|/viralx/||')
    echo "$key=$value" >> .env.local
done

# Start the application with PM2
pm2 start npm --name "viralx" -- start

# Save PM2 process list
pm2 save

# Generate startup script
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u ec2-user --hp /home/ec2-user