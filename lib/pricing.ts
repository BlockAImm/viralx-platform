export const PRICING = {
  likes: 0.10,
  retweets: 0.15,
  views: 0.01,
  followers: 0.10, // per follower
} as const;

export const SERVICE_LIMITS = {
  likes: { min: 1, max: 5000 },
  retweets: { min: 1, max: 500 },
  views: { min: 100, max: 100000 },
  followers: { min: 100, max: 10000 },
} as const;

export const DISCOUNT_TIERS = [
  { tokens: 5000000, discount: 10 },
  { tokens: 10000000, discount: 20 },
  { tokens: 15000000, discount: 30 },
  { tokens: 20000000, discount: 40 },
  { tokens: 25000000, discount: 50 },
] as const;

export function calculatePrice(
  service: keyof typeof PRICING,
  quantity: number,
  discountTier: number = 0
): number {
  const basePrice = PRICING[service] * quantity;
  const discountAmount = basePrice * (discountTier / 100);
  return Math.round((basePrice - discountAmount) * 100) / 100;
}

export function getDiscountTier(vixHoldings: number): number {
  for (let i = DISCOUNT_TIERS.length - 1; i >= 0; i--) {
    if (vixHoldings >= DISCOUNT_TIERS[i].tokens) {
      return DISCOUNT_TIERS[i].discount;
    }
  }
  return 0;
}