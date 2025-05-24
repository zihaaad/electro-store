# Electro - Electronics E-commerce Website

A modern, full-featured e-commerce platform built with Next.js 15, Sanity CMS, Clerk Authentication, and Stripe payments.

## Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, TailwindCSS, Radix UI
- **Backend/CMS**: Sanity.io
- **Authentication**: Clerk
- **Payments**: Stripe
- **Styling**: TailwindCSS with custom components
- **State Management**: Zustand
- **Deployment**: Vercel (recommended)

## Features

- Responsive design for all device sizes
- Product catalog with categories, search, and filters
- User authentication and profile management
- Shopping cart functionality
- Secure checkout with Stripe
- Order history and tracking
- Content management via Sanity
- Product reviews and ratings
- Blog section with categories
- Contact form with email notifications

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2023-05-03
SANITY_API_TOKEN=your_sanity_api_token

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Email Configuration (for contact form)
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=your-app-password
EMAIL_RECIPIENT=recipient-email@example.com
```

## Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables (see above)
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Sanity Studio

The Sanity Studio is integrated into the Next.js application and can be accessed at `/studio` route. You'll need to:

1. Create a Sanity account and project
2. Configure the environment variables
3. Deploy the schema to your Sanity project:
   ```bash
   npm run typegen
   ```

## Production Deployment Checklist

### 1. Sanity Setup

- Create a Sanity project at [sanity.io](https://www.sanity.io/)
- Create API tokens with appropriate permissions
- Deploy the schema to your Sanity project
- Add initial content (products, categories, etc.)

### 2. Clerk Setup

- Create a Clerk application at [clerk.dev](https://clerk.dev/)
- Configure authentication settings
- Set up OAuth providers if needed
- Add Clerk webhooks for user events

### 3. Stripe Setup

- Create a Stripe account at [stripe.com](https://stripe.com/)
- Set up products and prices (if using Stripe Products)
- Configure webhooks for payment events
- Complete account verification for live payments
- Set up required legal pages (privacy policy, terms of service)

### 4. Vercel Deployment

- Connect your GitHub repository to Vercel
- Configure environment variables
- Set up custom domain if needed
- Enable Vercel Analytics for monitoring
- Configure build settings (Node.js version, build command)

### 5. Post-Deployment Tasks

- Test the complete user journey (signup, browse, checkout)
- Verify email notifications are working
- Test responsiveness on various devices
- Set up monitoring and error tracking
- Configure regular database backups

## Legal Pages

This project includes the following legal pages required for e-commerce and Stripe verification:

- Privacy Policy: `/privacy-policy`
- Disclaimer: `/disclaimer`
- Delivery & Returns: `/delivery-returns`
- Terms & Conditions: `/terms`
- About Us: `/about`
- Contact: `/contact`

All of these pages are accessible from the footer's "Quick Links" section.

## Project Structure

```
/app                     # Next.js App Router
  /(admin)               # Admin routes
  /(auth)                # Authentication routes
  /(client)              # Client-facing routes
  /api                   # API routes
/components              # Reusable components
/constants               # Constants and configuration
/hooks                   # Custom React hooks
/lib                     # Utility functions
/public                  # Static assets
/sanity                  # Sanity configuration and schemas
  /queries               # GROQ queries
  /lib                   # Sanity utility functions
/store                   # Zustand store
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.
