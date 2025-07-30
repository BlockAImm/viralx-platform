'use client';

import { useState, useMemo } from 'react';
import MouseGlowEffect from '@/components/MouseGlowEffect';
import { InnovationIcon, CommunityIcon, SecurityIcon } from '@/components/ServiceIcons';

// Token constants
const TOTAL_SUPPLY = 1_000_000_000; // 1 billion tokens
const REVENUE_TO_TREASURY = 0.20; // 20% of revenue goes to staking treasury
const DAILY_DISTRIBUTION_RATE = 1/30; // 1/30th of treasury distributed daily

// Generate mock data for projected purchases
function generateProjectedData() {
  const data = [];
  const baseDaily = 1000; // Base daily revenue in USD
  
  for (let day = 1; day <= 730; day++) {
    let dailyRevenue;
    
    if (day <= 30) {
      // Aggressive growth to $10k in first 30 days (exponential)
      dailyRevenue = baseDaily * Math.pow(10, (day - 1) / 29) * (0.9 + Math.random() * 0.2);
    } else if (day <= 90) {
      // Continued strong growth to $50k by day 90
      const day30Revenue = 10000;
      const day90Revenue = 50000;
      const progress = (day - 30) / 60;
      dailyRevenue = day30Revenue + (day90Revenue - day30Revenue) * progress * (0.9 + Math.random() * 0.2);
    } else if (day <= 365) {
      // Growth to $100k by end of year 1
      const day90Revenue = 50000;
      const day365Revenue = 100000;
      const progress = (day - 90) / 275;
      dailyRevenue = day90Revenue + (day365Revenue - day90Revenue) * progress * (0.9 + Math.random() * 0.2);
    } else {
      // Steady growth to $200k by end of year 2
      const day365Revenue = 100000;
      const day730Revenue = 200000;
      const progress = (day - 365) / 365;
      dailyRevenue = day365Revenue + (day730Revenue - day365Revenue) * progress * (0.9 + Math.random() * 0.2);
    }
    
    // Staking participation: linear growth from 1% to 20% over first 730 days
    const stakingParticipation = Math.min(0.01 + (0.19 * (day / 730)), 0.20);
    
    data.push({
      day,
      dailyRevenue,
      treasuryAddition: dailyRevenue * REVENUE_TO_TREASURY,
      stakingParticipation: stakingParticipation * 100, // Convert to percentage
      totalStaked: TOTAL_SUPPLY * stakingParticipation,
    });
  }
  
  return data;
}

export default function VixTokenPage() {
  const [stakedAmount, setStakedAmount] = useState(1000000); // Default 1M tokens
  const [selectedDay, setSelectedDay] = useState(365); // Default 1 year
  
  const projectedData = useMemo(() => generateProjectedData(), []);
  
  // Calculate cumulative treasury and rewards
  const calculateRewards = useMemo(() => {
    let cumulativeTreasury = 0;
    let userCumulativeRewards = 0;
    
    for (let i = 0; i < selectedDay; i++) {
      const dayData = projectedData[i];
      cumulativeTreasury += dayData.treasuryAddition;
      
      // Daily distribution from treasury
      const dailyDistribution = cumulativeTreasury * DAILY_DISTRIBUTION_RATE;
      
      // User's share based on their stake
      const userShare = stakedAmount / dayData.totalStaked;
      const userDailyReward = dailyDistribution * userShare;
      
      userCumulativeRewards += userDailyReward;
      
      // Reduce treasury by distributed amount
      cumulativeTreasury -= dailyDistribution;
    }
    
    return {
      totalRewards: userCumulativeRewards,
      finalTreasury: cumulativeTreasury,
      avgDailyReward: userCumulativeRewards / selectedDay,
      roi: (userCumulativeRewards / (stakedAmount * 0.001)) * 100, // Assuming $0.001 token price
    };
  }, [stakedAmount, selectedDay, projectedData]);

  const selectedDayData = projectedData[selectedDay - 1];

  return (
    <div className="min-h-screen py-8 xs:py-10 sm:py-12">
      <div className="container mx-auto px-4 xs:px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8 xs:mb-10 sm:mb-12">
            <h1 className="font-cassio text-3xl xs:text-4xl sm:text-5xl md:text-6xl mb-3 xs:mb-4 text-gold">
              $VIX Token
            </h1>
            <p className="text-lg xs:text-xl sm:text-2xl text-steel-blue px-4 sm:px-0">
              The Future of Social Media Growth Rewards
            </p>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <MouseGlowEffect className="card text-center group">
              <div className="mb-3 text-ice-blue flex justify-center relative">
                <div className="absolute inset-0 bg-ice-blue/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <InnovationIcon className="w-12 h-12 relative z-10 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="font-manrope font-medium mb-2">Fair Launch</h3>
              <p className="text-steel-blue text-sm">
                SPL token on Solana with transparent tokenomics
              </p>
            </MouseGlowEffect>

            <MouseGlowEffect className="card text-center group">
              <div className="mb-3 text-ice-blue flex justify-center relative">
                <div className="absolute inset-0 bg-ice-blue/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CommunityIcon className="w-12 h-12 relative z-10 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="font-manrope font-medium mb-2">Revenue Sharing</h3>
              <p className="text-steel-blue text-sm">
                20% of all platform revenue distributed to stakers
              </p>
            </MouseGlowEffect>

            <MouseGlowEffect className="card text-center group">
              <div className="mb-3 text-ice-blue flex justify-center relative">
                <div className="absolute inset-0 bg-ice-blue/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <SecurityIcon className="w-12 h-12 relative z-10 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="font-manrope font-medium mb-2">Sustainable Rewards</h3>
              <p className="text-steel-blue text-sm">
                Daily distributions from growing treasury pool
              </p>
            </MouseGlowEffect>
          </div>

          {/* Tokenomics */}
          <MouseGlowEffect className="card mb-8">
            <h2 className="text-xl xs:text-2xl sm:text-3xl mb-4 xs:mb-6">Tokenomics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-manrope font-medium mb-3 xs:mb-4 text-base xs:text-lg">Token Details</h3>
                <ul className="space-y-2 xs:space-y-3 text-steel-blue text-sm xs:text-base">
                  <li className="flex justify-between">
                    <span>Token Type:</span>
                    <span className="text-titanium font-medium">SPL Token (Solana)</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Total Supply:</span>
                    <span className="text-titanium font-medium">1,000,000,000 $VIX</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Launch Type:</span>
                    <span className="text-titanium font-medium">Fair Launch</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Projection Assumption Price:</span>
                    <span className="text-titanium font-medium">$0.001</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-manrope font-medium mb-3 xs:mb-4 text-base xs:text-lg">Revenue Distribution</h3>
                <ul className="space-y-2 xs:space-y-3 text-steel-blue text-sm xs:text-base">
                  <li className="flex justify-between">
                    <span>Platform Operations:</span>
                    <span className="text-titanium font-medium">80%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Staking Treasury:</span>
                    <span className="text-gold font-bold">20%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Daily Distribution:</span>
                    <span className="text-titanium font-medium">1/30th of Treasury</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Holder Benefits:</span>
                    <span className="text-titanium font-medium">Up to 50% Discount</span>
                  </li>
                </ul>
              </div>
            </div>
          </MouseGlowEffect>

          {/* Staking Calculator */}
          <MouseGlowEffect className="card mb-8">
            <h2 className="text-xl xs:text-2xl sm:text-3xl mb-4 xs:mb-6">Staking Rewards Calculator</h2>
            
            {/* Chart Area */}
            <div className="bg-charcoal/50 rounded-lg p-3 xs:p-4 mb-4 xs:mb-6">
              <div className="flex flex-col sm:flex-row justify-between mb-4">
                <h3 className="font-manrope font-medium mb-2 sm:mb-0 text-sm xs:text-base">Projected Platform Growth</h3>
                <div className="text-sm text-steel-blue">
                  Day {selectedDay} • ${selectedDayData?.dailyRevenue >= 1000 
                    ? `${(selectedDayData.dailyRevenue / 1000).toFixed(1)}k` 
                    : selectedDayData?.dailyRevenue.toFixed(0)} Daily Revenue
                </div>
              </div>
              
              {/* Simple ASCII Chart */}
              <div className="h-32 xs:h-40 sm:h-48 flex items-end space-x-0.5 xs:space-x-1 mb-3 xs:mb-4">
                {[...Array(20)].map((_, i) => {
                  const dayIndex = Math.floor((i / 20) * selectedDay);
                  const data = projectedData[dayIndex];
                  // Dynamic normalization based on selected range
                  const maxRevenue = Math.max(...projectedData.slice(0, selectedDay).map(d => d.dailyRevenue));
                  const height = (data.dailyRevenue / maxRevenue) * 100; // Normalize to percentage
                  
                  return (
                    <div
                      key={i}
                      className="flex-1 bg-ice-blue/30 hover:bg-ice-blue/50 transition-all"
                      style={{ height: `${height}%` }}
                      title={`Day ${dayIndex + 1}: $${data.dailyRevenue >= 1000 
                        ? `${(data.dailyRevenue / 1000).toFixed(1)}k` 
                        : data.dailyRevenue.toFixed(0)}`}
                    />
                  );
                })}
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-steel-blue">Daily Revenue</p>
                  <p className="font-medium">${selectedDayData?.dailyRevenue >= 1000 
                    ? `${(selectedDayData.dailyRevenue / 1000).toFixed(1)}k` 
                    : selectedDayData?.dailyRevenue.toFixed(0)}</p>
                </div>
                <div>
                  <p className="text-steel-blue">To Treasury</p>
                  <p className="font-medium text-gold">${selectedDayData?.treasuryAddition >= 1000 
                    ? `${(selectedDayData.treasuryAddition / 1000).toFixed(1)}k` 
                    : selectedDayData?.treasuryAddition.toFixed(0)}</p>
                </div>
                <div>
                  <p className="text-steel-blue">Staking Rate</p>
                  <p className="font-medium">{selectedDayData?.stakingParticipation.toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-steel-blue">Total Staked</p>
                  <p className="font-medium">{(selectedDayData?.totalStaked / 1_000_000).toFixed(1)}M</p>
                </div>
              </div>
            </div>

            {/* Calculator Inputs */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-manrope font-medium mb-2">
                  Tokens to Stake
                </label>
                <input
                  type="number"
                  value={stakedAmount}
                  onChange={(e) => setStakedAmount(Math.max(0, parseInt(e.target.value) || 0))}
                  className="input w-full"
                  placeholder="Enter amount of $VIX to stake"
                />
                <p className="text-steel-blue text-xs mt-1">
                  {((stakedAmount / TOTAL_SUPPLY) * 100).toFixed(4)}% of total supply • ${(stakedAmount * 0.001).toFixed(2)} investment value
                </p>
              </div>

              <div>
                <label className="block text-sm font-manrope font-medium mb-2">
                  Staking Duration: Day {selectedDay}
                </label>
                <input
                  type="range"
                  min="1"
                  max="730"
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(parseInt(e.target.value))}
                  className="w-full"
                  style={{
                    background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${(selectedDay / 730) * 100}%, #475569 ${(selectedDay / 730) * 100}%, #475569 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-steel-blue mt-1">
                  <span>Day 1</span>
                  <span>Day 365</span>
                  <span>Day 730</span>
                </div>
              </div>

              {/* Results */}
              <div className="bg-charcoal/50 rounded-lg p-4 xs:p-5 sm:p-6 space-y-3 xs:space-y-4">
                <h3 className="font-manrope font-medium mb-3 xs:mb-4 text-sm xs:text-base">Projected Rewards</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-steel-blue text-xs xs:text-sm">Total Rewards (USD)</p>
                    <p className="text-lg xs:text-xl sm:text-2xl font-bold text-gold">${calculateRewards.totalRewards.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-steel-blue text-xs xs:text-sm">Average Daily Reward</p>
                    <p className="text-lg xs:text-xl sm:text-2xl font-bold">${calculateRewards.avgDailyReward.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-steel-blue text-xs xs:text-sm">Estimated ROI</p>
                    <p className="text-lg xs:text-xl sm:text-2xl font-bold text-ice-blue">{calculateRewards.roi.toFixed(2)}%</p>
                  </div>
                  <div>
                    <p className="text-steel-blue text-xs xs:text-sm">Treasury Balance</p>
                    <p className="text-lg xs:text-xl sm:text-2xl font-bold">${calculateRewards.finalTreasury >= 1000000 
                      ? `${(calculateRewards.finalTreasury / 1000000).toFixed(2)}M` 
                      : calculateRewards.finalTreasury >= 1000 
                      ? `${(calculateRewards.finalTreasury / 1000).toFixed(0)}k` 
                      : calculateRewards.finalTreasury.toFixed(0)}</p>
                  </div>
                </div>
              </div>
            </div>
          </MouseGlowEffect>

          {/* Additional Info */}
          <MouseGlowEffect className="card">
            <h2 className="text-xl xs:text-2xl sm:text-3xl mb-4 xs:mb-6">How It Works</h2>
            <ol className="space-y-3 xs:space-y-4">
              <li className="flex">
                <span className="text-gold font-bold mr-4">1.</span>
                <div>
                  <p className="font-manrope font-medium mb-1 text-sm xs:text-base">Fair Launch on Solana</p>
                  <p className="text-steel-blue text-xs xs:text-sm">1 billion $VIX tokens released with no pre-mine or team allocation</p>
                </div>
              </li>
              <li className="flex">
                <span className="text-gold font-bold mr-4">2.</span>
                <div>
                  <p className="font-manrope font-medium mb-1 text-sm xs:text-base">Revenue Generation</p>
                  <p className="text-steel-blue text-xs xs:text-sm">Users purchase Twitter/X growth services, generating platform revenue</p>
                </div>
              </li>
              <li className="flex">
                <span className="text-gold font-bold mr-4">3.</span>
                <div>
                  <p className="font-manrope font-medium mb-1 text-sm xs:text-base">Treasury Accumulation</p>
                  <p className="text-steel-blue text-xs xs:text-sm">20% of all revenue automatically flows to the staking treasury</p>
                </div>
              </li>
              <li className="flex">
                <span className="text-gold font-bold mr-4">4.</span>
                <div>
                  <p className="font-manrope font-medium mb-1 text-sm xs:text-base">Daily Distributions</p>
                  <p className="text-steel-blue text-xs xs:text-sm">1/30th of treasury distributed daily to all stakers proportionally</p>
                </div>
              </li>
              <li className="flex">
                <span className="text-gold font-bold mr-4">5.</span>
                <div>
                  <p className="font-manrope font-medium mb-1 text-sm xs:text-base">Compound Growth</p>
                  <p className="text-steel-blue text-xs xs:text-sm">As platform grows, treasury grows, increasing daily rewards</p>
                </div>
              </li>
            </ol>
          </MouseGlowEffect>

          {/* Launch CTA */}
          <div className="text-center mt-8 xs:mt-10 sm:mt-12">
            <div className="inline-block bg-gold/20 border border-gold/50 rounded-lg px-4 xs:px-6 sm:px-8 py-3 xs:py-4 mx-4 sm:mx-0">
              <p className="text-gold font-manrope font-bold text-base xs:text-lg mb-1 xs:mb-2">$VIX Token Fair Launch</p>
              <p className="text-titanium text-sm xs:text-base">Coming Soon on Solana</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}