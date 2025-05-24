# Electro - Electronics E-commerce Website

## Email Configuration for Contact Form

To enable the contact form functionality, you need to set up your email credentials in an `.env.local` file at the root of the project:

```
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=your-app-password
EMAIL_RECIPIENT=recipient-email@example.com
```

### Setting up Gmail App Password:

1. Enable 2-Step Verification in your Google Account
2. Go to Security > App passwords
3. Generate a new app password for "Mail" and your app name
4. Use that password in the EMAIL_APP_PASSWORD field

## Legal Pages for Stripe Verification

This project includes the following legal pages required for Stripe verification:

- Privacy Policy: `/privacy-policy`
- Disclaimer: `/disclaimer`
- Delivery & Returns: `/delivery-returns`
- Terms & Conditions: `/terms`
- About Us: `/about`
- Contact: `/contact`

All of these pages are accessible from the footer's "Quick Links" section for easy navigation.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
