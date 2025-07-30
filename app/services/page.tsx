import Link from 'next/link';
import MouseGlowEffect from '@/components/MouseGlowEffect';
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

export default function ServicesPage() {
  return (
    <div className="min-h-screen py-8 xs:py-10 sm:py-12">
      <div className="container mx-auto px-4 xs:px-4 sm:px-6">
        <div className="text-center mb-8 xs:mb-10 sm:mb-12">
          <h1 className="font-cassio text-3xl xs:text-4xl sm:text-5xl mb-3 xs:mb-4">Our Services</h1>
          <p className="text-base xs:text-lg sm:text-xl text-steel-blue px-4 sm:px-0">Choose a service to boost your social presence</p>
        </div>

        {/* Boost Tweet Button */}
        <div className="max-w-2xl mx-auto mb-8 xs:mb-10 sm:mb-12">
          <Link href="/boost-tweet">
            <MouseGlowEffect className="card hover:border-ice-blue/50 transition-all duration-200 cursor-pointer bg-gradient-to-br from-charcoal via-charcoal/90 to-ice-blue/10">
              <div className="text-center">
                <div className="mb-4 text-ice-blue">
                  <svg className="w-16 xs:w-20 sm:w-24 h-16 xs:h-20 sm:h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl xs:text-3xl sm:text-4xl font-cassio mb-3">Boost Tweet</h2>
                <p className="text-steel-blue mb-4 text-sm xs:text-base sm:text-lg">
                  Get likes, retweets, and views all in one order
                </p>
                <div className="inline-flex items-center gap-2 btn-primary px-6 xs:px-8 py-3 text-base xs:text-lg">
                  <span>All Services Combined</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </MouseGlowEffect>
          </Link>
        </div>

        <div className="grid grid-cols-1 mobile:grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-5 sm:gap-6 max-w-6xl mx-auto">
          {services.map((service) => (
            <Link key={service.name} href={service.href}>
              <MouseGlowEffect className="card h-full hover:border-ice-blue/50 transition-all duration-200 cursor-pointer">
                <div className="mb-3 xs:mb-4 text-center text-ice-blue">
                  <service.icon className="w-12 xs:w-14 sm:w-16 h-12 xs:h-14 sm:h-16 mx-auto" />
                </div>
                <h2 className="text-xl xs:text-2xl font-manrope font-medium mb-2 xs:mb-3">{service.name}</h2>
                <p className="text-steel-blue mb-3 xs:mb-4 text-sm xs:text-base">{service.description}</p>
                <div className="mt-auto space-y-1">
                  <div className="text-ice-blue font-semibold text-base xs:text-lg">{service.price}</div>
                  <div className="text-steel-blue text-sm xs:text-base">{service.max}</div>
                </div>
              </MouseGlowEffect>
            </Link>
          ))}
        </div>

        <div className="mt-12 xs:mt-14 sm:mt-16 text-center">
          <div className="inline-block bg-gold/20 border border-gold/50 rounded-lg px-4 xs:px-5 sm:px-6 py-3 xs:py-4 mx-4 sm:mx-0">
            <p className="text-gold font-manrope font-semibold text-base xs:text-lg mb-1 xs:mb-2">$VIX Token Holders Get Discounts!</p>
            <p className="text-titanium text-sm xs:text-base">Up to 50% off all services</p>
          </div>
        </div>
      </div>
    </div>
  );
}