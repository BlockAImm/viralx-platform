import MouseGlowEffect from '@/components/MouseGlowEffect';
import { DISCOUNT_TIERS, PRICING, SERVICE_LIMITS } from '@/lib/pricing';

export default function DocsPage() {
  return (
    <div className="min-h-screen py-8 xs:py-10 sm:py-12">
      <div className="container mx-auto px-4 xs:px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-cassio text-3xl xs:text-4xl sm:text-5xl text-center mb-8 xs:mb-10 sm:mb-12">Documentation</h1>

          <MouseGlowEffect className="card mb-6 xs:mb-8">
            <h2 className="mb-4 xs:mb-6 text-xl xs:text-2xl sm:text-3xl">$VIX Token Discount Tiers</h2>
            <div className="space-y-4">
              {DISCOUNT_TIERS.map((tier) => (
                <div key={tier.tokens} className="flex items-center justify-between p-3 xs:p-4 bg-charcoal/50 rounded-lg">
                  <div>
                    <p className="font-manrope font-medium text-sm xs:text-base">
                      {tier.tokens.toLocaleString()} $VIX
                    </p>
                    <p className="text-steel-blue text-xs xs:text-sm">
                      Hold this amount to unlock discount
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg xs:text-xl sm:text-2xl font-bold text-gold">{tier.discount}% OFF</p>
                    <p className="text-steel-blue text-xs xs:text-sm">All services</p>
                  </div>
                </div>
              ))}
            </div>
          </MouseGlowEffect>

          <MouseGlowEffect className="card mb-6 xs:mb-8">
            <h2 className="mb-4 xs:mb-6 text-xl xs:text-2xl sm:text-3xl">Service Pricing & Limits</h2>
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <table className="w-full min-w-[500px]">
                <thead>
                  <tr className="border-b border-steel-blue/20">
                    <th className="text-left py-2 xs:py-3 px-4 sm:px-0 font-manrope font-medium text-xs xs:text-sm sm:text-base">Service</th>
                    <th className="text-center py-2 xs:py-3 font-manrope font-medium text-xs xs:text-sm sm:text-base">Price</th>
                    <th className="text-center py-2 xs:py-3 font-manrope font-medium text-xs xs:text-sm sm:text-base hidden mobile:table-cell">Min</th>
                    <th className="text-center py-2 xs:py-3 font-manrope font-medium text-xs xs:text-sm sm:text-base">Max</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-steel-blue/10">
                    <td className="py-3 xs:py-4 px-4 sm:px-0 text-xs xs:text-sm sm:text-base">Tweet Likes</td>
                    <td className="text-center text-ice-blue text-xs xs:text-sm sm:text-base">${PRICING.likes}/like</td>
                    <td className="text-center text-xs xs:text-sm sm:text-base hidden mobile:table-cell">{SERVICE_LIMITS.likes.min}</td>
                    <td className="text-center text-xs xs:text-sm sm:text-base">{SERVICE_LIMITS.likes.max.toLocaleString()}</td>
                  </tr>
                  <tr className="border-b border-steel-blue/10">
                    <td className="py-3 xs:py-4 px-4 sm:px-0 text-xs xs:text-sm sm:text-base">Retweets</td>
                    <td className="text-center text-ice-blue text-xs xs:text-sm sm:text-base">${PRICING.retweets}/RT</td>
                    <td className="text-center text-xs xs:text-sm sm:text-base hidden mobile:table-cell">{SERVICE_LIMITS.retweets.min}</td>
                    <td className="text-center text-xs xs:text-sm sm:text-base">{SERVICE_LIMITS.retweets.max.toLocaleString()}</td>
                  </tr>
                  <tr className="border-b border-steel-blue/10">
                    <td className="py-3 xs:py-4 px-4 sm:px-0 text-xs xs:text-sm sm:text-base">Tweet Views</td>
                    <td className="text-center text-ice-blue text-xs xs:text-sm sm:text-base">${PRICING.views}/view</td>
                    <td className="text-center text-xs xs:text-sm sm:text-base hidden mobile:table-cell">{SERVICE_LIMITS.views.min.toLocaleString()}</td>
                    <td className="text-center text-xs xs:text-sm sm:text-base">{SERVICE_LIMITS.views.max.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="py-3 xs:py-4 px-4 sm:px-0 text-xs xs:text-sm sm:text-base">Followers</td>
                    <td className="text-center text-ice-blue text-xs xs:text-sm sm:text-base">$10/100</td>
                    <td className="text-center text-xs xs:text-sm sm:text-base hidden mobile:table-cell">{SERVICE_LIMITS.followers.min}</td>
                    <td className="text-center text-xs xs:text-sm sm:text-base">{SERVICE_LIMITS.followers.max.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </MouseGlowEffect>

          <MouseGlowEffect className="card mb-6 xs:mb-8">
            <h2 className="mb-3 xs:mb-4 text-xl xs:text-2xl sm:text-3xl">How It Works</h2>
            <ol className="space-y-4">
              <li className="flex">
                <span className="text-ice-blue font-bold mr-4">1.</span>
                <div>
                  <p className="font-manrope font-medium mb-1 text-sm xs:text-base">Connect Your Wallet</p>
                  <p className="text-steel-blue text-xs xs:text-sm">Use Phantom, Solflare, or any compatible Solana wallet</p>
                </div>
              </li>
              <li className="flex">
                <span className="text-ice-blue font-bold mr-4">2.</span>
                <div>
                  <p className="font-manrope font-medium mb-1 text-sm xs:text-base">Choose Your Service</p>
                  <p className="text-steel-blue text-xs xs:text-sm">Select from likes, retweets, views, or followers</p>
                </div>
              </li>
              <li className="flex">
                <span className="text-ice-blue font-bold mr-4">3.</span>
                <div>
                  <p className="font-manrope font-medium mb-1 text-sm xs:text-base">Enter Tweet/Profile URL</p>
                  <p className="text-steel-blue text-xs xs:text-sm">Paste the link to your tweet or Twitter profile</p>
                </div>
              </li>
              <li className="flex">
                <span className="text-ice-blue font-bold mr-4">4.</span>
                <div>
                  <p className="font-manrope font-medium mb-1 text-sm xs:text-base">Select Quantity & Pay</p>
                  <p className="text-steel-blue text-xs xs:text-sm">Choose amount and pay with USDC or SOL</p>
                </div>
              </li>
              <li className="flex">
                <span className="text-ice-blue font-bold mr-4">5.</span>
                <div>
                  <p className="font-manrope font-medium mb-1 text-sm xs:text-base">Watch Your Growth</p>
                  <p className="text-steel-blue text-xs xs:text-sm">Our AI engine starts working immediately</p>
                </div>
              </li>
            </ol>
          </MouseGlowEffect>

          <MouseGlowEffect className="card mb-6 xs:mb-8">
            <h2 className="mb-3 xs:mb-4 text-xl xs:text-2xl sm:text-3xl">Payment Methods</h2>
            <div className="grid grid-cols-1 mobile:grid-cols-3 gap-3 xs:gap-4">
              <div className="bg-charcoal/50 rounded-lg p-3 xs:p-4">
                <h3 className="font-manrope font-medium mb-1 xs:mb-2 text-sm xs:text-base">USDC</h3>
                <p className="text-steel-blue text-xs xs:text-sm">Stable, predictable pricing in USD</p>
              </div>
              <div className="bg-charcoal/50 rounded-lg p-3 xs:p-4">
                <h3 className="font-manrope font-medium mb-1 xs:mb-2 text-sm xs:text-base">SOL</h3>
                <p className="text-steel-blue text-xs xs:text-sm">Fast, low-fee Solana transactions</p>
              </div>
              <div className="bg-charcoal/50 rounded-lg p-3 xs:p-4 relative opacity-60">
                <h3 className="font-manrope font-medium mb-1 xs:mb-2 text-sm xs:text-base">$VIX</h3>
                <p className="text-steel-blue text-xs xs:text-sm">Extra benefits for holders</p>
                <p className="text-gold text-xs font-semibold mt-1">Coming Soon</p>
              </div>
            </div>
          </MouseGlowEffect>

          <MouseGlowEffect className="card">
            <h2 className="mb-3 xs:mb-4 text-xl xs:text-2xl sm:text-3xl">Important Notes</h2>
            <ul className="space-y-2 text-steel-blue text-xs xs:text-sm sm:text-base">
              <li>• All services start processing within minutes</li>
              <li>• Results typically appear within 24-48 hours</li>
              <li>• We use advanced AI to ensure organic-looking growth</li>
              <li>• Refunds available if service cannot be completed</li>
              <li>• $VIX token discounts apply automatically when connected</li>
            </ul>
          </MouseGlowEffect>
        </div>
      </div>
    </div>
  );
}