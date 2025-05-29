import {clerkMiddleware} from "@clerk/nextjs/server";

// Configure Clerk middleware with authorized domain
export default clerkMiddleware();

export const config = {
  matcher: [
    // Exclude static files, Clerk webhooks, and Stripe webhooks
    "/((?!_next/static|_next/image|api/webhooks/clerk|api/stripe/webhook|favicon.ico).*)",
    // Apply Clerk to all other API routes
    "/api/(.*)",
  ],
};
