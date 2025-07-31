'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import MouseGlowEffect from '@/components/MouseGlowEffect';
import { PRICING, SERVICE_LIMITS, calculatePrice } from '@/lib/pricing';
import { LikesIcon, RetweetsIcon, ViewsIcon } from '@/components/ServiceIcons';

export default function BoostTweetPage() {
  const { publicKey, connected } = useWallet();
  const [tweetUrl, setTweetUrl] = useState('');
  const [likes, setLikes] = useState(0);
  const [retweets, setRetweets] = useState(0);
  const [views, setViews] = useState(0);
  const [viewsInput, setViewsInput] = useState('');

  // Helper function to validate and set numeric input values
  const setValidatedValue = (value: string, setter: (value: number) => void, min: number, max: number) => {
    // Remove leading zeros and convert to number
    const cleanValue = value.replace(/^0+/, '') || '0';
    const numValue = Number(cleanValue);
    
    if (isNaN(numValue)) {
      setter(0);
    } else if (numValue === 0) {
      // Allow 0 regardless of minimum
      setter(0);
    } else if (numValue < min && numValue !== 0) {
      setter(min);
    } else if (numValue > max) {
      setter(max);
    } else {
      setter(numValue);
    }
  };

  // Helper function to clean input value for display
  const cleanInputValue = (value: string) => {
    if (value === '') return '';
    const cleanValue = value.replace(/^0+/, '') || '0';
    return cleanValue;
  };
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'USDC' | 'SOL' | 'VIX'>('USDC');

  // Calculate total price
  const likesPrice = calculatePrice('likes', likes, 0);
  const retweetsPrice = calculatePrice('retweets', retweets, 0);
  const viewsPrice = calculatePrice('views', views, 0);
  const totalPrice = likesPrice + retweetsPrice + viewsPrice;

  const validateTweetUrl = (url: string) => {
    return url.match(/^https?:\/\/(www\.)?(twitter\.com|x\.com)\/\w+\/status\/\d+$/);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!connected || !publicKey) {
      alert('Please connect your wallet first');
      return;
    }

    if (!validateTweetUrl(tweetUrl)) {
      alert('Please enter a valid tweet URL');
      return;
    }

    if (likes === 0 && retweets === 0 && views === 0) {
      alert('Please select at least one service');
      return;
    }

    setIsProcessing(true);
    
    try {
      console.log('Processing boost order:', { 
        tweetUrl, 
        likes, 
        retweets, 
        views, 
        totalPrice, 
        paymentMethod,
        wallet: publicKey.toBase58()
      });
      
      // For demo purposes, show success after delay
      setTimeout(() => {
        setIsProcessing(false);
        alert(`Order submitted successfully!\n\nServices:\n${likes > 0 ? `Likes: ${likes}\n` : ''}${retweets > 0 ? `Retweets: ${retweets}\n` : ''}${views > 0 ? `Views: ${views}\n` : ''}\nTotal: $${totalPrice.toFixed(2)}\n\nPayment integration will be activated when merchant wallet is configured.`);
        
        // Reset form
        setTweetUrl('');
        setLikes(0);
        setRetweets(0);
        setViews(0);
      }, 2000);
    } catch (error) {
      console.error('Payment error:', error);
      setIsProcessing(false);
      alert('Payment failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen py-8 xs:py-10 sm:py-12">
      <div className="container mx-auto px-4 xs:px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <MouseGlowEffect className="card">
            <div className="text-center mb-6 xs:mb-8">
              <h1 className="font-cassio text-2xl xs:text-3xl sm:text-4xl mb-3 xs:mb-4">Boost Your Tweet</h1>
              <p className="text-steel-blue text-sm xs:text-base sm:text-lg px-4 sm:px-0">
                Supercharge your tweet with likes, retweets, and views all in one place
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Tweet URL Input */}
              <div>
                <label className="block text-sm font-manrope font-medium mb-2">
                  Tweet URL
                </label>
                <input
                  type="url"
                  value={tweetUrl}
                  onChange={(e) => setTweetUrl(e.target.value)}
                  placeholder="https://x.com/username/status/..."
                  className="input w-full"
                  required
                />
                {tweetUrl && !validateTweetUrl(tweetUrl) && (
                  <p className="text-alert-red text-sm mt-1">
                    Please enter a valid tweet URL
                  </p>
                )}
              </div>

              {/* Services Grid */}
              <div className="grid grid-cols-1 mobile:grid-cols-3 gap-4 xs:gap-5 sm:gap-6">
                {/* Likes */}
                <div className="bg-charcoal/50 rounded-lg p-4 xs:p-5 sm:p-6">
                  <div className="text-center mb-3 xs:mb-4">
                    <div className="mb-1 xs:mb-2 text-ice-blue">
                      <LikesIcon className="w-8 xs:w-10 h-8 xs:h-10 mx-auto" />
                    </div>
                    <h3 className="font-manrope font-medium text-sm xs:text-base">Likes</h3>
                    <p className="text-ice-blue font-semibold text-xs xs:text-sm">${PRICING.likes}/like</p>
                  </div>
                  <input
                    type="number"
                    min="0"
                    max={SERVICE_LIMITS.likes.max}
                    step="10"
                    value={likes === 0 ? '' : likes.toString()}
                    onChange={(e) => {
                      const inputValue = e.target.value.replace(/[^0-9]/g, '');
                      if (inputValue === '') {
                        setLikes(0);
                        return;
                      }
                      const numValue = Number(inputValue);
                      if (numValue < SERVICE_LIMITS.likes.min) {
                        setLikes(0);
                      } else if (numValue > SERVICE_LIMITS.likes.max) {
                        setLikes(SERVICE_LIMITS.likes.max);
                      } else {
                        setLikes(numValue);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === '-' || e.key === 'e') {
                        e.preventDefault();
                      }
                    }}
                    className="input w-full text-center"
                    placeholder="0"
                  />
                  <p className="text-steel-blue text-xs mt-2 text-center">
                    Max: {SERVICE_LIMITS.likes.max.toLocaleString()}
                  </p>
                  {likes > 0 && (
                    <p className="text-center mt-2 text-sm">
                      Subtotal: ${likesPrice.toFixed(2)}
                    </p>
                  )}
                </div>

                {/* Retweets */}
                <div className="bg-charcoal/50 rounded-lg p-4 xs:p-5 sm:p-6">
                  <div className="text-center mb-3 xs:mb-4">
                    <div className="mb-1 xs:mb-2 text-ice-blue">
                      <RetweetsIcon className="w-8 xs:w-10 h-8 xs:h-10 mx-auto" />
                    </div>
                    <h3 className="font-manrope font-medium text-sm xs:text-base">Retweets</h3>
                    <p className="text-ice-blue font-semibold text-xs xs:text-sm">${PRICING.retweets}/RT</p>
                  </div>
                  <input
                    type="number"
                    min="0"
                    max={SERVICE_LIMITS.retweets.max}
                    step="5"
                    value={retweets === 0 ? '' : retweets.toString()}
                    onChange={(e) => {
                      const inputValue = e.target.value.replace(/[^0-9]/g, '');
                      if (inputValue === '') {
                        setRetweets(0);
                        return;
                      }
                      const numValue = Number(inputValue);
                      if (numValue < SERVICE_LIMITS.retweets.min) {
                        setRetweets(0);
                      } else if (numValue > SERVICE_LIMITS.retweets.max) {
                        setRetweets(SERVICE_LIMITS.retweets.max);
                      } else {
                        setRetweets(numValue);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === '-' || e.key === 'e') {
                        e.preventDefault();
                      }
                    }}
                    className="input w-full text-center"
                    placeholder="0"
                  />
                  <p className="text-steel-blue text-xs mt-2 text-center">
                    Max: {SERVICE_LIMITS.retweets.max.toLocaleString()}
                  </p>
                  {retweets > 0 && (
                    <p className="text-center mt-2 text-sm">
                      Subtotal: ${retweetsPrice.toFixed(2)}
                    </p>
                  )}
                </div>

                {/* Views */}
                <div className="bg-charcoal/50 rounded-lg p-4 xs:p-5 sm:p-6">
                  <div className="text-center mb-3 xs:mb-4">
                    <div className="mb-1 xs:mb-2 text-ice-blue">
                      <ViewsIcon className="w-8 xs:w-10 h-8 xs:h-10 mx-auto" />
                    </div>
                    <h3 className="font-manrope font-medium text-sm xs:text-base">Views</h3>
                    <p className="text-ice-blue font-semibold text-xs xs:text-sm">${PRICING.views}/view</p>
                  </div>
                  <input
                    type="number"
                    min="0"
                    max={SERVICE_LIMITS.views.max}
                    step="100"
                    value={viewsInput === '0' ? '' : viewsInput}
                    onChange={(e) => {
                      const inputValue = e.target.value.replace(/[^0-9]/g, '');
                      setViewsInput(inputValue);
                      if (inputValue === '' || inputValue === '0') {
                        setViews(0);
                      } else {
                        setViews(Number(inputValue));
                      }
                    }}
                    onBlur={() => {
                      if (viewsInput === '' || viewsInput === '0') {
                        setViewsInput('0');
                        setViews(0);
                      } else {
                        const numValue = Number(viewsInput);
                        if (numValue < SERVICE_LIMITS.views.min) {
                          setViewsInput(SERVICE_LIMITS.views.min.toString());
                          setViews(SERVICE_LIMITS.views.min);
                        } else if (numValue > SERVICE_LIMITS.views.max) {
                          setViewsInput(SERVICE_LIMITS.views.max.toString());
                          setViews(SERVICE_LIMITS.views.max);
                        } else {
                          setViewsInput(numValue.toString());
                          setViews(numValue);
                        }
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === '-' || e.key === 'e') {
                        e.preventDefault();
                      }
                    }}
                    className="input w-full text-center"
                    placeholder="0"
                  />
                  <p className="text-steel-blue text-xs mt-2 text-center">
                    Min: {SERVICE_LIMITS.views.min.toLocaleString()}<br />
                    Max: {SERVICE_LIMITS.views.max.toLocaleString()}
                  </p>
                  {views > 0 && (
                    <p className="text-center mt-2 text-sm">
                      Subtotal: ${viewsPrice.toFixed(2)}
                    </p>
                  )}
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-sm font-manrope font-medium mb-2">
                  Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2 xs:gap-3 sm:gap-4">
                  {(['USDC', 'SOL', 'VIX'] as const).map((method) => (
                    <div key={method} className="relative">
                      <button
                        type="button"
                        onClick={() => method !== 'VIX' && setPaymentMethod(method)}
                        disabled={method === 'VIX'}
                        className={`w-full py-2 px-2 xs:px-3 sm:px-4 rounded-md border text-sm xs:text-base payment-button ${
                          method === 'VIX'
                            ? 'border-steel-blue/20 bg-charcoal/30 text-steel-blue/50 cursor-not-allowed'
                            : paymentMethod === method
                            ? 'active border-ice-blue text-white'
                            : 'border-steel-blue/30 hover:border-ice-blue text-titanium hover:text-white'
                        }`}
                      >
                        {method}
                      </button>
                      {method === 'VIX' && (
                        <p className="text-xs text-steel-blue/50 text-center mt-1">Coming Soon</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-charcoal/50 rounded-lg p-4 xs:p-5 sm:p-6 space-y-2">
                <h3 className="font-manrope font-medium mb-3 xs:mb-4 text-sm xs:text-base">Order Summary</h3>
                {likes > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-steel-blue">{likes} Likes</span>
                    <span>${likesPrice.toFixed(2)}</span>
                  </div>
                )}
                {retweets > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-steel-blue">{retweets} Retweets</span>
                    <span>${retweetsPrice.toFixed(2)}</span>
                  </div>
                )}
                {views > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-steel-blue">{views} Views</span>
                    <span>${viewsPrice.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-steel-blue/20 pt-2 mt-4">
                  <div className="flex justify-between text-lg font-manrope font-medium">
                    <span>Total</span>
                    <span className="text-ice-blue">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!connected || isProcessing || !validateTweetUrl(tweetUrl) || totalPrice === 0}
                className={`w-full btn-primary py-2.5 xs:py-3 text-base xs:text-lg ${
                  (!connected || isProcessing || !validateTweetUrl(tweetUrl) || totalPrice === 0) 
                    ? 'opacity-50 cursor-not-allowed' 
                    : ''
                }`}
              >
                {!connected ? 'Connect Wallet' : isProcessing ? 'Processing...' : 'Boost Tweet'}
              </button>

              {/* Discount Notice */}
              <div className="text-center">
                <p className="text-steel-blue text-xs xs:text-sm">
                  Hold $VIX tokens to unlock up to 50% discount!
                </p>
              </div>
            </form>
          </MouseGlowEffect>
        </div>
      </div>
    </div>
  );
}