# AWS Deployment Setup Guide for ViralX

## Prerequisites
- AWS Account
- GitHub repository (already set up at https://github.com/BlockAImm/viralx-platform)
- Domain name (optional)

## Method 1: AWS Amplify (Easiest - Recommended)

### Step 1: Connect to AWS Amplify
1. Go to AWS Amplify Console
2. Click "New app" → "Host web app"
3. Choose GitHub and authorize AWS to access your repository
4. Select `BlockAImm/viralx-platform` repository
5. Select `main` branch

### Step 2: Configure Build Settings
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

### Step 3: Environment Variables
Add these in Amplify Console → App settings → Environment variables:
- `DATABASE_URL`
- `JWT_SECRET`
- `TWITTER_API_URL`
- `TWITTER_API_KEY`
- `NEXT_PUBLIC_MERCHANT_WALLET`
- `NEXT_PUBLIC_SOLANA_NETWORK` = mainnet-beta
- `NEXT_PUBLIC_SOLANA_RPC_URL`
- `NEXT_PUBLIC_USDC_MINT_ADDRESS`
- `NEXT_PUBLIC_WSOL_MINT_ADDRESS`

### Step 4: Deploy
Click "Save and deploy". Amplify will automatically deploy on every push to main.

## Method 2: EC2 with GitHub Actions

### Step 1: Set Up EC2 Instance
1. Launch EC2 instance (t3.medium recommended)
2. Choose Amazon Linux 2 or Ubuntu 22.04
3. Configure Security Group:
   - SSH (port 22) from your IP
   - HTTP (port 80) from anywhere
   - HTTPS (port 443) from anywhere
   - Custom TCP (port 1000) from anywhere

### Step 2: Initial Server Setup
SSH into your EC2 instance and run:
```bash
# Update system
sudo yum update -y  # For Amazon Linux
# or
sudo apt update && sudo apt upgrade -y  # For Ubuntu

# Install Node.js
curl -sL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# Install nginx
sudo yum install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Install PM2
sudo npm install -g pm2

# Install Git
sudo yum install -y git

# Clone repository
cd ~
git clone https://github.com/BlockAImm/viralx-platform.git
cd viralx-platform

# Install dependencies
npm install

# Set up PostgreSQL database
sudo yum install -y postgresql15-server postgresql15
sudo postgresql-setup initdb
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### Step 3: Configure Nginx
Create `/etc/nginx/sites-available/viralx`:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:1000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Step 4: Set Up GitHub Secrets
Go to your GitHub repository → Settings → Secrets and add:
- `EC2_HOST`: Your EC2 public IP
- `EC2_USERNAME`: ec2-user (for Amazon Linux) or ubuntu
- `EC2_SSH_KEY`: Your private SSH key content
- `AWS_ACCESS_KEY_ID`: IAM user access key
- `AWS_SECRET_ACCESS_KEY`: IAM user secret key
- `AWS_REGION`: Your AWS region (e.g., us-east-1)
- All environment variables from `.env.example`

### Step 5: Configure Deployment Method
In GitHub → Settings → Variables → Actions, add:
- `DEPLOY_METHOD`: EC2

## Method 3: AWS CodeDeploy

### Step 1: Create S3 Bucket
```bash
aws s3 mb s3://viralx-deployments
```

### Step 2: Create IAM Role for EC2
Create role with policies:
- AmazonEC2RoleforAWSCodeDeploy
- AmazonSSMManagedInstanceCore

### Step 3: Create CodeDeploy Application
```bash
aws deploy create-application --application-name viralx-app
```

### Step 4: Create Deployment Group
```bash
aws deploy create-deployment-group \
  --application-name viralx-app \
  --deployment-group-name viralx-deployment-group \
  --ec2-tag-filters Key=Name,Type=KEY_AND_VALUE,Value=viralx-server \
  --service-role-arn arn:aws:iam::YOUR_ACCOUNT_ID:role/CodeDeployServiceRole
```

## Environment Variables Setup

### Using AWS Systems Manager Parameter Store
Store sensitive variables securely:
```bash
aws ssm put-parameter \
  --name "/viralx/DATABASE_URL" \
  --value "postgresql://..." \
  --type "SecureString"

aws ssm put-parameter \
  --name "/viralx/JWT_SECRET" \
  --value "your-secret" \
  --type "SecureString"

# Repeat for all environment variables
```

## SSL Certificate Setup

### Using AWS Certificate Manager with CloudFront
1. Request certificate in ACM
2. Create CloudFront distribution
3. Point CloudFront to your EC2/Amplify endpoint

### Using Let's Encrypt on EC2
```bash
sudo yum install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## Monitoring

### CloudWatch Setup
1. Install CloudWatch agent on EC2
2. Configure logs:
   - Application logs: `/home/ec2-user/.pm2/logs/`
   - Nginx logs: `/var/log/nginx/`

### Alarms
Create alarms for:
- High CPU usage (> 80%)
- High memory usage (> 90%)
- Application health check failures
- Error rate spikes

## Database Setup

### Using RDS PostgreSQL
1. Create RDS instance
2. Configure security group for EC2 access
3. Update `DATABASE_URL` in environment variables

### Database Migrations
Run after each deployment:
```bash
npx prisma migrate deploy
```

## Troubleshooting

### Check Application Logs
```bash
pm2 logs viralx
```

### Check Nginx Logs
```bash
sudo tail -f /var/log/nginx/error.log
```

### Restart Application
```bash
pm2 restart viralx
```

### Update Application Manually
```bash
cd ~/viralx-platform
git pull origin main
npm install
npm run build
pm2 restart viralx
```

## Cost Optimization

1. Use t3.medium instance for production
2. Enable auto-scaling for traffic spikes
3. Use CloudFront for static asset caching
4. Schedule instance stop/start for development environments

## Security Best Practices

1. Never commit secrets to GitHub
2. Use IAM roles instead of access keys when possible
3. Enable AWS GuardDuty for threat detection
4. Regular security updates: `sudo yum update -y`
5. Use AWS WAF for application protection
6. Enable VPC flow logs
7. Implement least privilege IAM policies

## Support

For deployment issues:
1. Check CloudWatch logs
2. Review GitHub Actions logs
3. Verify environment variables
4. Ensure database connectivity

Remember to update your domain's DNS to point to your AWS deployment!