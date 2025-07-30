import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';
import {
  getAssociatedTokenAddress,
  createTransferInstruction,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';

const MERCHANT_WALLET = new PublicKey(process.env.NEXT_PUBLIC_MERCHANT_WALLET || '11111111111111111111111111111111');
const USDC_MINT = new PublicKey(process.env.NEXT_PUBLIC_USDC_MINT_ADDRESS || '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU');

export async function createSolPayment(
  connection: Connection,
  payerPublicKey: PublicKey,
  amountInSol: number
): Promise<Transaction> {
  const transaction = new Transaction();

  // Add SOL transfer instruction
  transaction.add(
    SystemProgram.transfer({
      fromPubkey: payerPublicKey,
      toPubkey: MERCHANT_WALLET,
      lamports: Math.floor(amountInSol * LAMPORTS_PER_SOL),
    })
  );

  // Get recent blockhash
  const { blockhash } = await connection.getLatestBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = payerPublicKey;

  return transaction;
}

export async function createUsdcPayment(
  connection: Connection,
  payerPublicKey: PublicKey,
  amountInUsdc: number
): Promise<Transaction> {
  const transaction = new Transaction();

  // Get token accounts
  const payerTokenAccount = await getAssociatedTokenAddress(
    USDC_MINT,
    payerPublicKey
  );

  const merchantTokenAccount = await getAssociatedTokenAddress(
    USDC_MINT,
    MERCHANT_WALLET
  );

  // USDC has 6 decimals
  const amount = Math.floor(amountInUsdc * 1e6);

  // Add USDC transfer instruction
  transaction.add(
    createTransferInstruction(
      payerTokenAccount,
      merchantTokenAccount,
      payerPublicKey,
      amount,
      [],
      TOKEN_PROGRAM_ID
    )
  );

  // Get recent blockhash
  const { blockhash } = await connection.getLatestBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = payerPublicKey;

  return transaction;
}

export async function estimateSolToUsd(solAmount: number): Promise<number> {
  // In production, fetch real price from an oracle
  // For demo, using a fixed rate
  const SOL_USD_PRICE = 150; // $150 per SOL
  return solAmount * SOL_USD_PRICE;
}

export async function estimateUsdToSol(usdAmount: number): Promise<number> {
  // In production, fetch real price from an oracle
  // For demo, using a fixed rate
  const SOL_USD_PRICE = 150; // $150 per SOL
  return usdAmount / SOL_USD_PRICE;
}