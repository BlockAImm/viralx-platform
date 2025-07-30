'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { LikesIcon, RetweetsIcon, ViewsIcon, FollowersIcon } from '@/components/ServiceIcons';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-obsidian/80 backdrop-blur-lg border-b border-steel-blue/20">
      <div className="container mx-auto px-4 xs:px-4 sm:px-6 py-3 xs:py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/FullLogo_Transparent.png"
              alt="Viral X"
              width={200}
              height={60}
              className="h-10 xs:h-10 sm:h-12 md:h-14 w-auto"
            />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-titanium hover:text-ice-blue transition-colors">
              Home
            </Link>
            <Link href="/boost-tweet" className="text-titanium hover:text-ice-blue transition-colors font-semibold">
              Boost Tweet
            </Link>
            <div className="relative group">
              <Link href="/services" className="text-titanium hover:text-ice-blue transition-colors flex items-center">
                Services
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              
              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 mt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-1 group-hover:translate-y-0">
                <div className="bg-charcoal border border-steel-blue/20 rounded-lg shadow-large p-2 electric-dropdown">
                  <Link href="/services/likes" className="flex items-center space-x-3 px-4 py-3 rounded-md hover:bg-obsidian/50 transition-colors">
                    <div className="text-ice-blue">
                      <LikesIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-manrope font-medium">Tweet Likes</p>
                      <p className="text-steel-blue text-sm">$0.10/like</p>
                    </div>
                  </Link>
                  
                  <Link href="/services/retweets" className="flex items-center space-x-3 px-4 py-3 rounded-md hover:bg-obsidian/50 transition-colors">
                    <div className="text-ice-blue">
                      <RetweetsIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-manrope font-medium">Retweets</p>
                      <p className="text-steel-blue text-sm">$0.15/RT</p>
                    </div>
                  </Link>
                  
                  <Link href="/services/views" className="flex items-center space-x-3 px-4 py-3 rounded-md hover:bg-obsidian/50 transition-colors">
                    <div className="text-ice-blue">
                      <ViewsIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-manrope font-medium">Tweet Views</p>
                      <p className="text-steel-blue text-sm">$0.01/view</p>
                    </div>
                  </Link>
                  
                  <Link href="/services/followers" className="flex items-center space-x-3 px-4 py-3 rounded-md hover:bg-obsidian/50 transition-colors">
                    <div className="text-ice-blue">
                      <FollowersIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-manrope font-medium">Followers</p>
                      <p className="text-steel-blue text-sm">$10/100</p>
                    </div>
                  </Link>
                  
                  <div className="border-t border-steel-blue/20 mt-2 pt-2">
                    <Link href="/services" className="flex items-center justify-center px-4 py-2 text-ice-blue hover:text-white transition-colors">
                      View All Services →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <Link href="/dashboard" className="text-titanium hover:text-ice-blue transition-colors">
              Dashboard
            </Link>
            <Link href="/vision" className="text-titanium hover:text-ice-blue transition-colors">
              Vision
            </Link>
            <Link href="/vix" className="text-gold hover:text-yellow-400 transition-colors font-semibold">
              $VIX
            </Link>
            <Link href="/docs" className="text-titanium hover:text-ice-blue transition-colors">
              Docs
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            <WalletMultiButton 
              className="!bg-ice-blue hover:!bg-blue-600 !text-white !font-manrope !font-medium !transition-colors !duration-150 !text-sm lg:!text-base"
              startIcon={undefined}
            >
              Connect Wallet
            </WalletMultiButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-titanium hover:text-ice-blue transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="px-4 py-4 space-y-3 border-t border-steel-blue/20">
            <Link 
              href="/" 
              className="block py-2 text-titanium hover:text-ice-blue transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/boost-tweet" 
              className="block py-2 text-titanium hover:text-ice-blue transition-colors font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Boost Tweet
            </Link>
            
            {/* Mobile Services Dropdown */}
            <div>
              <button
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className="w-full flex items-center justify-between py-2 text-titanium hover:text-ice-blue transition-colors"
              >
                Services
                <svg className={`w-4 h-4 transition-transform ${servicesDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className={`transition-all duration-300 ${servicesDropdownOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <div className="pl-4 space-y-2 mt-2">
                  <Link 
                    href="/services/likes" 
                    className="flex items-center space-x-3 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <LikesIcon className="w-5 h-5 text-ice-blue" />
                    <div>
                      <p className="font-manrope">Tweet Likes</p>
                      <p className="text-steel-blue text-sm">$0.10/like</p>
                    </div>
                  </Link>
                  
                  <Link 
                    href="/services/retweets" 
                    className="flex items-center space-x-3 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <RetweetsIcon className="w-5 h-5 text-ice-blue" />
                    <div>
                      <p className="font-manrope">Retweets</p>
                      <p className="text-steel-blue text-sm">$0.15/RT</p>
                    </div>
                  </Link>
                  
                  <Link 
                    href="/services/views" 
                    className="flex items-center space-x-3 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <ViewsIcon className="w-5 h-5 text-ice-blue" />
                    <div>
                      <p className="font-manrope">Tweet Views</p>
                      <p className="text-steel-blue text-sm">$0.01/view</p>
                    </div>
                  </Link>
                  
                  <Link 
                    href="/services/followers" 
                    className="flex items-center space-x-3 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FollowersIcon className="w-5 h-5 text-ice-blue" />
                    <div>
                      <p className="font-manrope">Followers</p>
                      <p className="text-steel-blue text-sm">$10/100</p>
                    </div>
                  </Link>
                  
                  <Link 
                    href="/services" 
                    className="block py-2 text-ice-blue hover:text-white transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    View All Services →
                  </Link>
                </div>
              </div>
            </div>
            
            <Link 
              href="/dashboard" 
              className="block py-2 text-titanium hover:text-ice-blue transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              href="/vision" 
              className="block py-2 text-titanium hover:text-ice-blue transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Vision
            </Link>
            <Link 
              href="/vix" 
              className="block py-2 text-gold hover:text-yellow-400 transition-colors font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              $VIX
            </Link>
            <Link 
              href="/docs" 
              className="block py-2 text-titanium hover:text-ice-blue transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Docs
            </Link>
            
            <div className="pt-4">
              <WalletMultiButton 
                className="!w-full !bg-ice-blue hover:!bg-blue-600 !text-white !font-manrope !font-medium !transition-colors !duration-150"
                startIcon={undefined}
              >
                Connect Wallet
              </WalletMultiButton>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}