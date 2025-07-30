# ViralX Deployment Guide

## GitHub Setup

### 1. Initialize Git Repository
```bash
cd /Volumes/PRO-G40/Development/ViralX/viralx
git init
git add .
git commit -m "Initial commit: ViralX platform"
```

### 2. Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `viralx-platform`
3. Description: "AI-powered Twitter/X growth platform with Solana payments"
4. Set to Private (recommended)
5. Don't initialize with README (we already have one)

### 3. Connect Local to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/viralx-platform.git
git branch -M main
git push -u origin main
```

## AWS Deployment Setup

### Prerequisites
- AWS Account
- AWS CLI installed
- Node.js 18+ on EC2
- PostgreSQL database (RDS recommended)
- Domain name (optional)

### Environment Variables for Production
Copy `.env.example` to `.env.local` and update:
- `DATABASE_URL`: Your production PostgreSQL connection string
- `NEXT_PUBLIC_MERCHANT_WALLET`: Your actual Solana wallet address
- `TWITTER_API_URL` & `TWITTER_API_KEY`: Your Twitter API credentials
- `JWT_SECRET`: Generate a secure random string
- `NEXT_PUBLIC_SOLANA_RPC_URL`: Consider using a premium RPC provider

### Deployment Options

#### Option 1: AWS EC2 with PM2
```bash
# On EC2 instance
git clone https://github.com/YOUR_USERNAME/viralx-platform.git
cd viralx-platform
npm install
npm run build
npm install -g pm2
pm2 start npm --name "viralx" -- start
```

#### Option 2: AWS Amplify (Recommended)
1. Connect GitHub repo to AWS Amplify
2. Set environment variables in Amplify console
3. Automatic deployments on push to main

#### Option 3: Docker Container
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### GitHub Actions for CI/CD
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to AWS

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to AWS
        # Add your deployment steps here
```

### Security Considerations
1. Never commit `.env.local` or any secrets
2. Use AWS Secrets Manager for sensitive data
3. Set up HTTPS with SSL certificate
4. Configure security groups properly
5. Enable AWS CloudWatch for monitoring

### Database Migration
```bash
# Run on production
npx prisma migrate deploy
```

### Monitoring
- Set up CloudWatch alarms
- Configure error tracking (e.g., Sentry)
- Set up uptime monitoring

## Support
For deployment issues, check:
- AWS documentation
- Next.js deployment guides
- Prisma production guidelines