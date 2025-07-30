'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { PRICING, SERVICE_LIMITS, calculatePrice } from '@/lib/pricing';
import MouseGlowEffect from './MouseGlowEffect';

interface ServiceFormProps {
  service: 'likes' | 'retweets' | 'views' | 'followers';
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export default function ServiceForm({ service, title, description, icon }: ServiceFormProps) {
  const { publicKey, connected } = useWallet();
  const [link, setLink] = useState('');
  const [quantity, setQuantity] = useState(SERVICE_LIMITS[service].min);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'USDC' | 'SOL' | 'VIX'>('USDC');

  const price = calculatePrice(service, quantity, 0); // TODO: Get user's discount tier
  const limits = SERVICE_LIMITS[service];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!connected || !publicKey) {
      alert('Please connect your wallet first');
      return;
    }

    setIsProcessing(true);
    
    try {
      // In a real implementation, this would:
      // 1. Create a payment transaction
      // 2. Have the user sign and send it
      // 3. Wait for confirmation
      // 4. Create the order in the backend
      
      console.log('Processing order:', { 
        service, 
        link, 
        quantity, 
        price, 
        paymentMethod,
        wallet: publicKey.toBase58()
      });
      
      // For demo purposes, show success after delay
      setTimeout(() => {
        setIsProcessing(false);
        alert(`Order submitted successfully!\n\nService: ${service}\nQuantity: ${quantity}\nTotal: $${price.toFixed(2)}\n\nPayment integration with ${paymentMethod} will be activated when merchant wallet is configured.`);
        
        // Reset form
        setLink('');
        setQuantity(SERVICE_LIMITS[service].min);
      }, 2000);
    } catch (error) {
      console.error('Payment error:', error);
      setIsProcessing(false);
      alert('Payment failed. Please try again.');
    }
  };

  const validateLink = (url: string) => {
    if (service === 'followers') {
      return url.match(/^https?:\/\/(www\.)?(twitter\.com|x\.com)\/\w+$/);
    }
    return url.match(/^https?:\/\/(www\.)?(twitter\.com|x\.com)\/\w+\/status\/\d+$/);
  };

  return (
    <div className="min-h-screen py-8 xs:py-10 sm:py-12">
      <div className="container mx-auto px-4 xs:px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <MouseGlowEffect className="card">
            <div className="text-center mb-6 xs:mb-8">
              <div className="mb-3 xs:mb-4 text-ice-blue">
                {React.createElement(icon, { className: "w-12 xs:w-14 sm:w-16 h-12 xs:h-14 sm:h-16 mx-auto" })}
              </div>
              <h1 className="font-cassio text-2xl xs:text-3xl sm:text-4xl mb-2">{title}</h1>
              <p className="text-steel-blue text-sm xs:text-base px-4 sm:px-0">{description}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-manrope font-medium mb-2">
                  {service === 'followers' ? 'Twitter Profile URL' : 'Tweet URL'}
                </label>
                <input
                  type="url"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder={service === 'followers' ? 'https://x.com/username' : 'https://x.com/username/status/...'}
                  className="input w-full"
                  required
                />
                {link && !validateLink(link) && (
                  <p className="text-alert-red text-sm mt-1">
                    Please enter a valid {service === 'followers' ? 'profile' : 'tweet'} URL
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-manrope font-medium mb-2">
                  Quantity
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min={limits.min}
                    max={limits.max}
                    step={service === 'views' ? 100 : service === 'followers' ? 100 : 1}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="flex-1"
                  />
                  <input
                    type="number"
                    min={limits.min}
                    max={limits.max}
                    step={service === 'views' ? 100 : service === 'followers' ? 100 : 1}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="input w-24 text-center"
                  />
                </div>
                <p className="text-steel-blue text-sm mt-1">
                  Min: {limits.min.toLocaleString()} | Max: {limits.max.toLocaleString()}
                </p>
              </div>

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

              <div className="bg-charcoal/50 rounded-lg p-4 xs:p-5 sm:p-6 space-y-2">
                <div className="flex justify-between text-sm xs:text-base">
                  <span className="text-steel-blue">Subtotal</span>
                  <span>${price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm xs:text-base">
                  <span className="text-steel-blue">Discount</span>
                  <span className="text-signal-green">0%</span>
                </div>
                <div className="border-t border-steel-blue/20 pt-2">
                  <div className="flex justify-between text-base xs:text-lg font-manrope font-medium">
                    <span>Total</span>
                    <span className="text-ice-blue">${price.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={!connected || isProcessing || !validateLink(link)}
                className={`w-full btn-primary py-2.5 xs:py-3 text-base xs:text-lg ${
                  (!connected || isProcessing || !validateLink(link)) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {!connected ? 'Connect Wallet' : isProcessing ? 'Processing...' : 'Purchase'}
              </button>
            </form>
          </MouseGlowEffect>
        </div>
      </div>
    </div>
  );
}