'use client';

import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';
import MouseGlowEffect from '@/components/MouseGlowEffect';
import { DISCOUNT_TIERS } from '@/lib/pricing';

interface Order {
  id: string;
  service: string;
  link: string;
  quantity: number;
  price: number;
  status: string;
  createdAt: string;
}

interface UserData {
  vixHoldings: number;
  discountTier: number;
}

export default function DashboardPage() {
  const { publicKey, connected } = useWallet();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!connected) {
      setLoading(false);
      return;
    }

    // Initialize with empty data
    setUserData({
      vixHoldings: 0,
      discountTier: 0,
    });

    setOrders([]);

    setLoading(false);
  }, [connected]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse text-ice-blue text-2xl mb-2">Loading...</div>
        </div>
      </div>
    );
  }

  if (!connected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-cassio mb-4">Connect Your Wallet</h2>
          <p className="text-steel-blue mb-8">Please connect your wallet to view your dashboard</p>
          <button
            onClick={() => {
              const walletButton = document.querySelector('.wallet-adapter-button') as HTMLButtonElement;
              if (walletButton) walletButton.click();
            }}
            className="btn-primary px-8 py-3"
          >
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'text-signal-green';
      case 'PROCESSING':
        return 'text-ice-blue';
      case 'FAILED':
        return 'text-alert-red';
      default:
        return 'text-steel-blue';
    }
  };

  const getServiceIcon = (service: string) => {
    switch (service) {
      case 'likes':
        return '❤️';
      case 'retweets':
        return '🔁';
      case 'views':
        return '👁️';
      case 'followers':
        return '👥';
      default:
        return '📊';
    }
  };

  const currentTier = DISCOUNT_TIERS.find(tier => userData?.vixHoldings >= tier.tokens);
  const nextTier = DISCOUNT_TIERS.find(tier => userData?.vixHoldings < tier.tokens);

  return (
    <div className="min-h-screen py-8 xs:py-10 sm:py-12">
      <div className="container mx-auto px-4 xs:px-4 sm:px-6">
        <h1 className="font-cassio text-3xl xs:text-4xl sm:text-5xl text-center mb-8 xs:mb-10 sm:mb-12">Dashboard</h1>

        <div className="grid grid-cols-1 mobile:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 sm:gap-8 mb-8 xs:mb-10 sm:mb-12">
          <MouseGlowEffect className="card mobile:col-span-2 lg:col-span-1">
            <h3 className="font-manrope font-medium mb-2 xs:mb-3 sm:mb-4 text-sm xs:text-base">Wallet Connected</h3>
            <p className="text-steel-blue text-xs xs:text-sm truncate">
              {publicKey?.toBase58()}
            </p>
          </MouseGlowEffect>

          <MouseGlowEffect className="card">
            <h3 className="font-manrope font-medium mb-2 xs:mb-3 sm:mb-4 text-sm xs:text-base">$VIX Holdings</h3>
            <p className="text-xl xs:text-2xl font-bold text-gold">
              {userData?.vixHoldings.toLocaleString() || '0'}
            </p>
            <p className="text-steel-blue text-xs xs:text-sm mt-1">
              Current discount: {userData?.discountTier || 0}%
            </p>
          </MouseGlowEffect>

          <MouseGlowEffect className="card">
            <h3 className="font-manrope font-medium mb-2 xs:mb-3 sm:mb-4 text-sm xs:text-base">Next Tier</h3>
            {nextTier ? (
              <>
                <p className="text-steel-blue text-xs xs:text-sm">
                  Hold {nextTier.tokens.toLocaleString()} $VIX for
                </p>
                <p className="text-xl xs:text-2xl font-bold text-ice-blue">{nextTier.discount}% OFF</p>
              </>
            ) : (
              <p className="text-gold font-semibold text-sm xs:text-base">Max tier reached!</p>
            )}
          </MouseGlowEffect>
        </div>

        <MouseGlowEffect className="card">
          <h2 className="mb-4 xs:mb-6 text-xl xs:text-2xl sm:text-3xl">Order History</h2>
          {orders.length === 0 ? (
            <p className="text-steel-blue text-center py-8 text-sm xs:text-base">No orders yet</p>
          ) : (
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="border-b border-steel-blue/20">
                    <th className="text-left py-2 xs:py-3 px-4 sm:px-0 font-manrope font-medium text-xs xs:text-sm sm:text-base">Service</th>
                    <th className="text-left py-2 xs:py-3 font-manrope font-medium text-xs xs:text-sm sm:text-base hidden sm:table-cell">Link</th>
                    <th className="text-center py-2 xs:py-3 font-manrope font-medium text-xs xs:text-sm sm:text-base">Qty</th>
                    <th className="text-center py-2 xs:py-3 font-manrope font-medium text-xs xs:text-sm sm:text-base">Price</th>
                    <th className="text-center py-2 xs:py-3 font-manrope font-medium text-xs xs:text-sm sm:text-base">Status</th>
                    <th className="text-center py-2 xs:py-3 font-manrope font-medium text-xs xs:text-sm sm:text-base hidden mobile:table-cell">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-steel-blue/10">
                      <td className="py-3 xs:py-4 px-4 sm:px-0 text-xs xs:text-sm sm:text-base">
                        <span className="mr-1 xs:mr-2">{getServiceIcon(order.service)}</span>
                        <span className="capitalize">{order.service}</span>
                      </td>
                      <td className="py-3 xs:py-4 hidden sm:table-cell">
                        <a
                          href={order.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-ice-blue hover:underline truncate max-w-xs inline-block text-xs xs:text-sm"
                        >
                          {order.link}
                        </a>
                      </td>
                      <td className="text-center py-3 xs:py-4 text-xs xs:text-sm sm:text-base">{order.quantity.toLocaleString()}</td>
                      <td className="text-center py-3 xs:py-4 text-xs xs:text-sm sm:text-base">${order.price.toFixed(2)}</td>
                      <td className="text-center py-3 xs:py-4">
                        <span className={`font-medium ${getStatusColor(order.status)} text-xs xs:text-sm sm:text-base`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="text-center py-3 xs:py-4 text-steel-blue text-xs xs:text-sm hidden mobile:table-cell">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </MouseGlowEffect>

        <div className="mt-8 xs:mt-10 sm:mt-12 text-center">
          <p className="text-steel-blue mb-3 xs:mb-4 text-sm xs:text-base">Need more engagement?</p>
          <a href="/services" className="btn-primary inline-block px-6 xs:px-8 py-2.5 xs:py-3 text-sm xs:text-base">
            Order New Service
          </a>
        </div>
      </div>
    </div>
  );
}