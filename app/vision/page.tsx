import MouseGlowEffect from '@/components/MouseGlowEffect';
import { InnovationIcon, CommunityIcon, SecurityIcon } from '@/components/ServiceIcons';

export default function VisionPage() {
  return (
    <div className="min-h-screen py-8 xs:py-10 sm:py-12">
      <div className="container mx-auto px-4 xs:px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-cassio text-3xl xs:text-4xl sm:text-5xl text-center mb-8 xs:mb-10 sm:mb-12">Our Vision</h1>

          <MouseGlowEffect className="card mb-6 xs:mb-8">
            <h2 className="mb-3 xs:mb-4 text-xl xs:text-2xl sm:text-3xl">Democratizing Social Influence</h2>
            <p className="text-steel-blue leading-relaxed mb-3 xs:mb-4 text-sm xs:text-base">
              At Viral X, we believe that every voice deserves to be heard. For too long, the tools and technologies 
              that power social media growth have been gatekept by agencies and influencers with deep pockets. 
              We're changing that narrative.
            </p>
            <p className="text-steel-blue leading-relaxed text-sm xs:text-base">
              Our cutting-edge AI technology levels the playing field, giving independent creators, small businesses, 
              and passionate individuals access to the same powerful growth tools used by major influencers and brands.
            </p>
          </MouseGlowEffect>

          <MouseGlowEffect className="card mb-6 xs:mb-8">
            <h2 className="mb-3 xs:mb-4 text-xl xs:text-2xl sm:text-3xl">The Power of Blockchain</h2>
            <p className="text-steel-blue leading-relaxed mb-3 xs:mb-4 text-sm xs:text-base">
              By integrating blockchain technology and the $VIX token, we're creating a transparent, secure, and 
              community-driven ecosystem. Token holders aren't just customers – they're stakeholders in the future 
              of social media growth.
            </p>
            <p className="text-steel-blue leading-relaxed text-sm xs:text-base">
              Our tiered discount system rewards loyalty and investment in the platform, with holders of 25M+ $VIX 
              tokens receiving up to 50% off all services. This creates a virtuous cycle where success breeds success.
            </p>
          </MouseGlowEffect>

          <MouseGlowEffect className="card mb-6 xs:mb-8">
            <h2 className="mb-3 xs:mb-4 text-xl xs:text-2xl sm:text-3xl">AI-Powered Authenticity</h2>
            <p className="text-steel-blue leading-relaxed mb-3 xs:mb-4 text-sm xs:text-base">
              Our AI doesn't just boost numbers – it understands context, timing, and audience behavior to deliver 
              organic-looking growth that doesn't trigger platform penalties. We're constantly evolving our algorithms 
              to stay ahead of platform changes and deliver sustainable results.
            </p>
          </MouseGlowEffect>

          <div className="grid grid-cols-1 mobile:grid-cols-3 gap-4 xs:gap-5 sm:gap-6">
            <MouseGlowEffect className="card text-center">
              <div className="mb-2 xs:mb-3 text-ice-blue flex justify-center">
                <InnovationIcon className="w-10 xs:w-12 h-10 xs:h-12" />
              </div>
              <h3 className="font-manrope font-medium mb-1 xs:mb-2 text-sm xs:text-base">Innovation</h3>
              <p className="text-steel-blue text-xs xs:text-sm">
                Pioneering AI technology that adapts to platform changes
              </p>
            </MouseGlowEffect>

            <MouseGlowEffect className="card text-center">
              <div className="mb-2 xs:mb-3 text-ice-blue flex justify-center">
                <CommunityIcon className="w-10 xs:w-12 h-10 xs:h-12" />
              </div>
              <h3 className="font-manrope font-medium mb-1 xs:mb-2 text-sm xs:text-base">Community</h3>
              <p className="text-steel-blue text-xs xs:text-sm">
                Building a supportive ecosystem of creators and growth hackers
              </p>
            </MouseGlowEffect>

            <MouseGlowEffect className="card text-center">
              <div className="mb-2 xs:mb-3 text-ice-blue flex justify-center">
                <SecurityIcon className="w-10 xs:w-12 h-10 xs:h-12" />
              </div>
              <h3 className="font-manrope font-medium mb-1 xs:mb-2 text-sm xs:text-base">Security</h3>
              <p className="text-steel-blue text-xs xs:text-sm">
                Blockchain-secured transactions and data protection
              </p>
            </MouseGlowEffect>
          </div>

          <div className="text-center mt-8 xs:mt-10 sm:mt-12">
            <p className="text-base xs:text-lg sm:text-xl text-steel-blue mb-4 xs:mb-6 px-4 sm:px-0">Join us in revolutionizing social media growth</p>
            <div className="inline-block bg-gold/20 border border-gold/50 rounded-lg px-4 xs:px-6 py-2 xs:py-3">
              <p className="text-gold font-manrope font-semibold text-sm xs:text-base">$VIX Token Launch Coming Soon!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}