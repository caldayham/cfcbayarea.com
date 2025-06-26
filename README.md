# Construction & Design Website

A modern, responsive website for our construction and design business built with TypeScript, React, and Tailwind CSS.

Quality design and construction for those small to medium sized outdoor projects you've always wanted to check off your todo list. Clear and honest communication, non-corprateized prices, and a demonstrated commitment to client satisfaction. 

If there's a project you haven't gotten around to yet feel free to leave your number and we'll give you a quick call, even if we aren't a great fit we are happy to point you in the right direction!

Cal is a graduate from the University of Minnesota with a degree in cell biology, and Fynn is a current undergraduate at Foothills college with a focus in engineering. Cal and Fynn grew up and their fathers workshop and have an intuitive understanding of the design / build process of physical structures.



## About

This website showcases our construction and design services, featuring our portfolio of completed projects and providing an easy way for potential clients to get in touch with us.

## Features

- **Homepage** - Introduction to our business and what we offer
- **Process** - Overview of how we work with clients
- **Portfolio** - Showcase of our completed projects
- **Contact** - Easy ways for clients to reach out
## Tech Stack

- **TypeScript** - Type-safe JavaScript development
- **React** - Modern UI framework
- **Tailwind CSS** - Utility-first CSS framework
- **Responsive Design** - Mobile-friendly across all devices

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone [your-repo-url]
cd construction-website
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
app/
├── layout.js                    # Main layout component
├── page.js                      # Home page
├── dashboard/                   # Dashboard pages
│   ├── layout.js               # Dashboard layout
│   └── page.js                 # Dashboard main page
├── api/                        # API routes
│   ├── auth/                   # Authentication endpoints
│   ├── lead/                   # Lead management endpoints
│   ├── stripe/                 # Stripe payment endpoints
│   └── webhook/                # Webhook handlers
├── blog/                       # Blog pages
├── privacy-policy/             # Privacy policy page
├── tos/                        # Terms of service page
├── error.js                    # Error handling component
├── not-found.js               # 404 page component
└── globals.css                # Global CSS styles

components/
├── LayoutClient.js            # Client-side layout wrapper
├── Header.js                  # Main header component
├── Footer.js                  # Main footer component
├── Hero.js                    # Hero section component
├── Pricing.js                 # Pricing section component
├── ButtonAccount.js           # Account button component
├── ButtonCheckout.js          # Checkout button component
├── ButtonSignIn.js            # Sign in button component
├── ButtonSupport.js           # Support button component
├── ButtonLead.js              # Lead generation button
├── ButtonPopover.js           # Popover button component
├── ButtonGradient.js          # Gradient style button
├── Modal.js                   # Modal dialog component
├── Tabs.js                    # Tabs navigation component
├── FeaturesGrid.js            # Features grid display
├── FeaturesAccordion.js       # Features accordion component
├── FeaturesList.js            # Features list component
├── Testimonials1.js           # Testimonials style 1
├── Testimonials3.js           # Testimonials style 3
├── Testimonials11.js          # Testimonials style 11
├── TestimonialsSmall.js       # Small testimonial component
├── TestimonialsAvatars.js     # Testimonials with avatars
├── TestimonialRating.js       # Testimonial with rating
├── WithWithout.js             # Comparison component
├── CTA.js                     # Call to action component
├── Problem.js                 # Problem statement component
├── FAQ.js                     # FAQ component
└── BetterIcon.js              # Enhanced icon component

libs/
├── mongo.js                   # MongoDB connection
├── mongoose.js                # Mongoose ORM setup
├── next-auth.js               # NextAuth authentication setup
├── api.js                     # API utilities
├── resend.js                  # Email sending functionality
├── stripe.js                  # Stripe integration
├── seo.js                     # SEO utilities
└── gpt.js                     # OpenAI GPT integration

models/
├── User.js                    # User data model
├── Lead.js                    # Lead data model
└── plugins/                   # Mongoose plugins

public/
├── blog/                      # Blog static assets
├── robots.txt                 # Robots crawl instructions
├── sitemap.xml                # Site map index
└── sitemap-0.xml              # Generated sitemap

.gitignore                     # Git ignore file
package.json                   # NPM package definition
package-lock.json              # NPM package lock
next.config.js                 # Next.js configuration
tailwind.config.js             # Tailwind CSS configuration
postcss.config.js              # PostCSS configuration
jsconfig.json                  # JavaScript configuration
.eslintrc.json                 # ESLint configuration
next-sitemap.config.js         # Sitemap generation config
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler

## Deployment

The site can be easily deployed to platforms like Vercel, Netlify, or any static hosting service.

## Contact

For questions about this project or our construction services, feel free to reach out through the contact page on the website.

---

Built with ❤️ by [Your Names]