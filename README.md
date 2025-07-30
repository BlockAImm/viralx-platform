# Viral X - AI-Powered Social Growth Platform

Viral X is a cutting-edge platform that democratizes access to AI-powered social media growth tools for Twitter/X.

## Features

- 🚀 AI-powered engagement services (likes, retweets, views, followers)
- 💰 Multi-payment support (USDC, SOL, $VIX token)
- 🎯 Tiered discount system for $VIX token holders
- 🌐 Solana blockchain integration (mainnet-beta)
- 📊 User dashboard with order tracking
- 🎨 Futuristic dark theme with mouse glow effects

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
- Copy `.env.example` to `.env.local`
- Update with your configuration

3. Set up database (PostgreSQL):
```bash
npx prisma migrate dev
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:1000](http://localhost:1000)

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS with custom branding
- **Blockchain**: Solana Web3.js, SPL Token
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with wallet-based auth

## Services & Pricing

- **Tweet Likes**: $0.10/like (max 5,000)
- **Retweets**: $0.15/RT (max 500)
- **Tweet Views**: $0.01/view (max 100,000)
- **Followers**: $10/100 (max 10,000)

## $VIX Token Discounts

- 5M tokens: 10% discount
- 10M tokens: 20% discount
- 15M tokens: 30% discount
- 20M tokens: 40% discount
- 25M tokens: 50% discount

## Development Notes

- Currently configured for Solana mainnet-beta
- Update `NEXT_PUBLIC_MERCHANT_WALLET` in `.env.local` with your mainnet wallet
- Twitter API integration requires valid API credentials
- For deployment instructions, see `README.deployment.md`

## ngrok Setup

To expose your local development server:

```bash
ngrok http 1000
```

This will provide a public URL that can be accessed from any server.