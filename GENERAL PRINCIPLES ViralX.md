Viral X

Viral X is a set of cutting edge AI tools that now enable all X/twitter users to have access to the same technology that influencers and big KOL accounts have had.

Buy tweets, 


The $VIX token will be launched soon and anybody who holds 5m tokens will get a 10% discount on purchases, 10m a 20% discount, 15m a 30% discount, 20m a 40% discount and 25m a 50% discount on purchased services.

Users can purchase:

Tweet likes

Tweet Views

Retweets

Followers

Cost: $0.15/RT, $0.10/Like, $0.01/View

10 usd per 100 followers


Max likes  : 5000
Max RTs: 500
Max views: 100,000


Users can pay in usdc, solana or $VIX. Users just need to connect their wallet, post the tweet or twitter profile, pay the ammount and the ai engine will start working. 


The branding needs to be high tech, futuristic, AI oriented with a blockchain/crypto feel

The website should have a home page that has a tab for all the tools, then a user clicks on the tool he wants and then he is given a page to input his tweet/twitter account, selects the quantity he wants to purchase, and the page shows the price it will cost and charges him when he connects his wallet.

Ont he homepage also state: $VIX token coming soon!

There should also be a vision page that describes the vision of the project and a docs page that describes the discounts a user can get. 

Make sure the website is built in a dark theme and use the FullLogo_Transparent.png logo found in the branding folder in the top left hand corner. Make sure the hero has a futuristic mouse however effect animation. Include a link icon to twitter and telegram in the footer. 

The frontend must be written in next.js, the backend should create accounts by wallet and store a history of purchases. 

Use devnet for solana transactions to test with first.

Here are the required API's


curl --location 'http://154.211.15.218:8286/api/twitter-action' \
--header 'Authorization: Bearer 22aa36cd9d81bb7dfb8e84c83c059YjRDFTJVkpzEiC79hwn13XXs' \
--header 'Content-Type: application/json' \
--data '{
    "service":"views",
  "link":"https://x.com/elonmusk/status/1946839030177632475",
  "quantity":100
}'


service: 'likes', 'retweets', 'views','bookmarks','followers'


curl --location 'http://154.211.15.218:8286/api/order-status?order_id=75266' \
--header 'Authorization: Bearer 22aa36cd9d81bb7dfb8e84c83c059YjRDFTJVkpzEiC79hwn13XXs'


curl --location 'http://154.211.15.218:8286/api/balance' \
--header 'Authorization: Bearer 22aa36cd9d81bb7dfb8e84c83c059YjRDFTJVkpzEiC79hwn13XXs'

Please ensure that npm run dev will start the frontend and backend and that a ngrok tunnel can be pointed to the front end an all users on any server using the ngrok domain can access all features of the app.

Viral X Brand Guidelines
Brand Identity
Viral X represents the democratization of social influence through cutting-edge AI technology. Our visual identity communicates innovation, sophistication, and the power of viral growth in the Web3 era.
Color Palette
Primary Colors

Obsidian Black: #0A0B0F (Primary background)
Ice Blue: #3B82F6 (Primary accent, CTAs)
Charcoal: #1F2937 (Secondary backgrounds)
Titanium: #E5E7EB (Primary text on dark)

Secondary Colors

Steel Blue: #64748B (Secondary text, borders)
Slate: #475569 (Muted elements)
Pearl: #F9FAFB (Light backgrounds)
Graphite: #111827 (Deep backgrounds)

Accent Colors (Use Sparingly)

Signal Green: #10B981 (Success states only)
Alert Red: #EF4444 (Errors only)
Gold: #F59E0B ($VIX token only)

Gradient Usage

Primary Gradient: Ice Blue → Steel Blue (subtle 45° angle)
Background Gradient: Obsidian Black → Charcoal (very subtle)
Gradients should be understated, max 20% opacity difference

Typography
Primary Typeface
Cassio BC (Headers, Logo & Display)

Regular: Primary headers, logo
Use sparingly for maximum impact
Best at larger sizes (32px+)
Not recommended for body text

Secondary Typeface
Manrope (Subheadings & UI Elements)

Medium: Subheadings, button text
Regular: Navigation items
Semi-bold: Emphasis, CTAs
Complements Cassio BC's geometric style

Body Typeface
Inter (Body Text & Small UI)

Regular: Body text, descriptions
Medium: Labels, small headers
Light: Captions, metadata
Excellent readability at all sizes

Type Scale

Display: 48-64px (Cassio BC)
H1: 36px (Cassio BC)
H2: 28px (Manrope Medium)
H3: 22px (Manrope Medium)
Body Large: 18px (Inter)
Body Regular: 16px (Inter)
Caption: 14px (Inter)
Micro: 12px (Inter)

Typography Rules

Cassio BC: Reserved for high-impact headers and logo
Line height: 1.6x for body text, 1.3x for headers
Letter spacing: Default for all fonts
Primary text: Titanium (#E5E7EB)
Secondary text: Steel Blue (#64748B)
No gradient text effects

Font Pairing Guidelines

Never use Cassio BC below 24px
Pair Cassio BC headers with Manrope subheaders
Use Inter for all text 18px and below
Maintain clear hierarchy between font families

Visual Elements
Design Principles

Minimalism: Less is more
Contrast: Use space and typography for hierarchy
Subtlety: Effects should enhance, not dominate

Border & Dividers

Border color: rgba(100, 116, 139, 0.2)
Border width: 1px
Divider height: 1px
Corner radius: 8px (standard), 12px (cards)

Shadows (Minimal)

Small: 0 1px 2px rgba(0, 0, 0, 0.05)
Medium: 0 4px 6px rgba(0, 0, 0, 0.07)
Large: 0 10px 15px rgba(0, 0, 0, 0.1)

Grid System

8px base unit
12-column grid for web
4-column grid for mobile
Margins: 32px (desktop), 20px (mobile)

Iconography

Line weight: 1.5px
Style: Geometric, precise
Color: Inherit from text
No decorative effects

UI Components
Buttons

Primary: Ice Blue background, white text (Manrope Medium)
Secondary: Transparent with 1px Steel Blue border
Ghost: Text only, underline on hover
Height: 44px (large), 36px (medium), 28px (small)
Border radius: 6px
Hover: Darken by 10%, no effects

Cards

Background: Charcoal
Border: 1px solid rgba(100, 116, 139, 0.1)
Border radius: 12px
Padding: 24px
Card titles: Manrope Medium
Card body: Inter Regular

Forms

Input background: rgba(31, 41, 55, 0.5)
Input border: 1px solid rgba(100, 116, 139, 0.3)
Focus border: Ice Blue
Height: 44px
Labels: Inter Medium
Input text: Inter Regular

Data Visualization

Chart titles: Manrope Medium
Chart labels: Inter Regular
Monochromatic charts (shades of blue)
Thin lines (1-2px)
Grid lines: 5% opacity

Logo Usage

Logo text: Cassio BC
Primary: White on dark backgrounds
Secondary: Charcoal on light backgrounds
Minimum size: 28px height
Clear space: 1.5x the height of the "X"
No effects or modifications

Animation Principles

Duration: 150-200ms
Easing: ease-out
Transitions: Opacity and position only
No: Bounces, scales, or decorative animations

Voice & Tone

Professional: Industry-leading technology
Clear: Technical accuracy without jargon
Confident: Trusted by professionals
Efficient: Get to the point

Spacing System

4px (xs)
8px (sm)
16px (md)
24px (lg)
32px (xl)
48px (2xl)
64px (3xl)

Forbidden Practices

Never use Cassio BC for body text
Don't mix more than two fonts in a single component
No neon colors or bright gradients
No glow effects or shadows beyond specified
Avoid pure black (#000000) or pure white (#FFFFFF)

Accessibility

WCAG AAA contrast ratios where possible
Minimum 16px font size for body text
Focus states: 2px Ice Blue outline
Interactive elements: minimum 44x44px
Clear visual hierarchy through typography and spacing

Special Elements
$VIX Token Display

Amount: Manrope Semi-bold
Gold color used only for token amount
Contained within subtle bordered badge

Section Headers

Page titles: Cassio BC (36-48px)
Section titles: Manrope Medium (24-28px)
Subsections: Inter Medium (18-20px)


Please also take the following into consideration: 

Additional Features to Consider
Order Management:

Order history page
Order status tracking (pending, processing, completed)
Estimated completion times


User Dashboard:

Wallet balance display
$VIX holdings and discount tier indicator
Analytics on past purchases
Favorite tweets/profiles

Technical Infrastructure:

WebSocket for real-time order updates
Queue system for processing orders
Webhook endpoints for payment confirmations


Payment Flow Clarification

Add payment confirmation step
Show gas fees estimation
Display USD equivalent for SOL payments
Clear error handling for failed transactions


Legal/Compliance

Terms of Service page
Disclaimer about Twitter's ToS



Marketing Elements

FAQ section addressing common concerns
"How it works" visual guide

Database Schema Considerations

User table (wallet, created_at, tier)
Orders table (status, service, quantity, price, tx_hash)
Audit log for all transactions
Token holdings snapshot table


Brand Guidelines Application

The mouse hover effect should be subtle (following the "no decorative animations" rule)
Consider using the Ice Blue color sparingly for CTAs only
Ensure the $VIX token amount uses the Gold color as specified