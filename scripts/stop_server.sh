#!/bin/bash
# Stop the PM2 process
pm2 stop viralx || true
pm2 delete viralx || true

# Clean up environment file
rm -f /home/ec2-user/viralx-platform/.env.local