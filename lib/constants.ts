import { PublicKey } from '@solana/web3.js';

// Token Mint Addresses (Mainnet)
export const USDC_MINT = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v');
export const WSOL_MINT = new PublicKey('So11111111111111111111111111111111111111112');

// Native SOL doesn't have a mint address, but we use WSOL for SPL token operations
export const PAYMENT_TOKENS = {
  SOL: {
    symbol: 'SOL',
    name: 'Solana',
    decimals: 9,
    isNative: true,
    mint: null, // Native SOL has no mint
  },
  USDC: {
    symbol: 'USDC',
    name: 'USD Coin',
    decimals: 6,
    isNative: false,
    mint: USDC_MINT,
  },
  WSOL: {
    symbol: 'WSOL',
    name: 'Wrapped SOL',
    decimals: 9,
    isNative: false,
    mint: WSOL_MINT,
  },
};

// Merchant wallet address (needs to be updated with actual mainnet wallet)
export const MERCHANT_WALLET = new PublicKey(
  process.env.NEXT_PUBLIC_MERCHANT_WALLET || '11111111111111111111111111111111'
);

// Network Configuration
export const NETWORK = process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'mainnet-beta';
export const RPC_URL = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com';