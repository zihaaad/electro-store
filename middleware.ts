import {clerkMiddleware} from "@clerk/nextjs/server";

// Configure Clerk middleware with authorized domain
export default clerkMiddleware();

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|api/webhooks/clerk|favicon.ico).*)",
    "/api/(.*)",
  ],
};
