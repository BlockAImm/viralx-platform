'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import MouseGlowEffect from '@/components/MouseGlowEffect';
import { NeuralNetwork } from '@/components/NeuralNetwork';
import { useWallet } from '@solana/wallet-adapter-react';
import { LikesIcon, RetweetsIcon, ViewsIcon, FollowersIcon } from '@/components/ServiceIcons';

const services = [
  {
    name: 'Tweet Likes',
    icon: LikesIcon,
    description: 'Boost engagement with authentic likes',
    price: '$0.10/like',
    max: '5,000 max',
    href: '/services/likes',
  },
  {
    name: 'Retweets',
    icon: RetweetsIcon,
    description: 'Amplify your reach with strategic retweets',
    price: '$0.15/RT',
    max: '500 max',
    href: '/services/retweets',
  },
  {
    name: 'Tweet Views',
    icon: ViewsIcon,
    description: 'Increase visibility and impressions',
    price: '$0.01/view',
    max: '100,000 max',
    href: '/services/views',
  },
  {
    name: 'Followers',
    icon: FollowersIcon,
    description: 'Grow your audience organically',
    price: '$10/100',
    max: '10,000 max',
    href: '/services/followers',
  },
];

export default function HomePage() {
  const { publicKey } = useWallet();
  const [isHeroHovered, setIsHeroHovered] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <MouseGlowEffect 
        className="relative overflow-hidden bg-gradient-to-br from-obsidian via-charcoal/50 to-obsidian"
        onMouseEnter={() => setIsHeroHovered(true)}
        onMouseLeave={() => setIsHeroHovered(false)}
      >
        <NeuralNetwork isHovered={isHeroHovered} />
        <div className="container mx-auto px-4 xs:px-4 sm:px-6 py-16 xs:py-20 sm:py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="mb-8 animate-fade-in-up">
              <div className="relative inline-block mx-auto logo-glow-container">
                <Image
                  src="/FullLogo_Transparent.png"
                  alt="Viral X"
                  width={800}
                  height={240}
                  className="mx-auto h-32 xs:h-36 sm:h-40 mobile:h-44 tablet:h-48 md:h-56 lg:h-64 w-auto logo-spin transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 logo-glow"></div>
              </div>
            </div>
            <h1 className="text-3xl xs:text-4xl sm:text-5xl tablet:text-6xl md:text-7xl font-cassio mb-4 xs:mb-6 animate-fade-in-up animation-delay-200">
              Go Viral With AI
            </h1>
            <p className="text-base xs:text-lg sm:text-xl tablet:text-xl md:text-2xl text-steel-blue mb-6 xs:mb-8 tablet:mb-10 font-manrope animate-fade-in-up animation-delay-400 px-4 sm:px-0">
              Access the same cutting-edge AI technology that top influencers use to dominate X/Twitter
            </p>
            <div className="flex flex-col gap-6 justify-center items-center animate-fade-in-up animation-delay-600">
              <Link href="/boost-tweet" className="btn-primary px-6 xs:px-8 sm:px-10 py-3 xs:py-3 sm:py-4 text-base xs:text-lg sm:text-xl hover:scale-105 transform transition-all duration-200">
                Boost Tweet
              </Link>
              <div className="text-gold font-manrope font-semibold text-sm xs:text-base sm:text-lg animate-pulse">
                $VIX Token Coming Soon!
              </div>
            </div>
          </div>
          {/* Background animation elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-ice-blue/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-ice-blue/10 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
          </div>
        </div>
      </MouseGlowEffect>

      {/* Services Grid */}
      <div className="container mx-auto px-4 xs:px-4 sm:px-6 py-12 xs:py-16 sm:py-20">
        <h2 className="text-center mb-8 xs:mb-10 sm:mb-12 text-3xl xs:text-4xl sm:text-5xl">Our Services</h2>
        <div className="grid grid-cols-1 mobile:grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-5 sm:gap-6">
          {services.map((service) => (
            <Link key={service.name} href={service.href}>
              <MouseGlowEffect className="card h-full hover:border-ice-blue/50 transition-all duration-200 cursor-pointer">
                <div className="mb-4 text-ice-blue">
                  <service.icon className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-xl font-manrope font-medium mb-2">{service.name}</h3>
                <p className="text-steel-blue text-sm mb-4">{service.description}</p>
                <div className="mt-auto">
                  <div className="text-ice-blue font-semibold">{service.price}</div>
                  <div className="text-steel-blue text-sm">{service.max}</div>
                </div>
              </MouseGlowEffect>
            </Link>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-charcoal/50 py-12 xs:py-16 sm:py-20">
        <div className="container mx-auto px-4 xs:px-4 sm:px-6">
          <h2 className="text-center mb-8 xs:mb-10 sm:mb-12 text-3xl xs:text-4xl sm:text-5xl">Why Choose Viral X?</h2>
          <div className="grid grid-cols-1 mobile:grid-cols-3 gap-6 xs:gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-ice-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-ice-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-manrope font-medium mb-2">Lightning Fast</h3>
              <p className="text-steel-blue text-sm">Results start appearing within minutes of your order</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-ice-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-ice-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-manrope font-medium mb-2">Secure & Safe</h3>
              <p className="text-steel-blue text-sm">Your wallet and data are protected with blockchain security</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-ice-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-ice-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-manrope font-medium mb-2">$VIX Discounts</h3>
              <p className="text-steel-blue text-sm">Hold $VIX tokens to unlock up to 50% discount</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 xs:px-4 sm:px-6 py-12 xs:py-16 sm:py-20">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="mb-4 xs:mb-6 text-3xl xs:text-4xl sm:text-5xl">Ready to Go Viral?</h2>
          <p className="text-steel-blue mb-6 xs:mb-8 text-sm xs:text-base sm:text-lg px-4 sm:px-0">
            Join thousands of creators using AI to amplify their social presence
          </p>
          <Link href="/boost-tweet" className="btn-primary inline-block px-6 xs:px-8 py-2.5 xs:py-3 text-base xs:text-lg">
            Increase Engagement
          </Link>
        </div>
      </div>
    </div>
  );
}