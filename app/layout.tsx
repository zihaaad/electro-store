import type {Metadata} from "next";
import "./globals.css";
import {Toaster} from "react-hot-toast";
import {Lexend} from "next/font/google";
import Script from "next/script";
import {generateOrganizationJsonLd} from "@/lib/structured-data";
import {getDefaultMetadata} from "@/lib/metadata";
import {ClerkProvider} from "@clerk/nextjs";

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-lexend",
});

// Generate metadata for the site
export const metadata: Metadata = getDefaultMetadata();

const RootLayout = ({children}: {children: React.ReactNode}) => {
  // Generate organization structured data
  const organizationJsonLd = generateOrganizationJsonLd();

  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          {/* Add organization structured data */}
          <Script
            id="organization-jsonld"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(organizationJsonLd),
            }}
          />
        </head>
        <body className={`${lexend.variable}  antialiased`}>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#000000",
                color: "#fff",
              },
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
};
export default RootLayout;
