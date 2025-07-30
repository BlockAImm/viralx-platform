# GitHub Repository Setup Instructions

Your ViralX codebase is now ready to be pushed to GitHub. Follow these steps:

## 1. Create GitHub Repository

1. Go to https://github.com/new
2. Repository settings:
   - **Repository name**: `viralx-platform` (or your preferred name)
   - **Description**: "AI-powered Twitter/X growth platform with Solana payments"
   - **Public/Private**: Choose based on your preference
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)

## 2. Connect Your Local Repository to GitHub

After creating the repository on GitHub, run these commands in your terminal:

```bash
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/viralx-platform.git

# Push your code to GitHub
git push -u origin main
```

If you're using SSH instead of HTTPS:
```bash
git remote add origin git@github.com:YOUR_USERNAME/viralx-platform.git
git push -u origin main
```

## 3. Verify the Push

Your repository should now be live on GitHub with all files uploaded.

## 4. Set Up GitHub Secrets (for CI/CD)

Go to your repository's Settings > Secrets and variables > Actions, and add:

- `DATABASE_URL`
- `JWT_SECRET`
- `TWITTER_API_URL`
- `TWITTER_API_KEY`
- `NEXT_PUBLIC_MERCHANT_WALLET`

## 5. Enable GitHub Actions (Optional)

If you want automatic deployments to AWS:

1. Go to Actions tab in your repository
2. Click "New workflow"
3. Choose "Node.js" or create a custom workflow
4. Use the template in `.github/workflows/deploy.yml` (create this file)

## Next Steps

1. Set up AWS deployment following `README.deployment.md`
2. Configure your domain (if you have one)
3. Set up monitoring and alerts
4. Create development/staging branches as needed

## Troubleshooting

If you get a "permission denied" error:
```bash
# Check your remote URL
git remote -v

# If using HTTPS, GitHub might ask for authentication
# Consider using a Personal Access Token or GitHub CLI
```

If you need to change the remote URL:
```bash
git remote set-url origin NEW_URL_HERE
```