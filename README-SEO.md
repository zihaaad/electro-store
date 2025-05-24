# SEO Improvements for Electro E-commerce

This document outlines the SEO improvements implemented in the Electro e-commerce application.

## Domain Configuration

The domain configuration is centralized and can be easily changed by updating environment variables:

```env
# Domain Configuration
NEXT_PUBLIC_DOMAIN=electro-store.com
NEXT_PUBLIC_SITE_URL=https://electro-store.com
```

These variables are used throughout the application for generating canonical URLs, metadata, and structured data.

## Metadata Utilities

We've created a comprehensive set of metadata utilities in `lib/metadata.ts`:

- `siteConfig`: Centralized configuration for site name, description, domain, etc.
- `getDefaultMetadata()`: Default metadata for the site
- `getProductMetadata()`: Dynamic metadata for product pages
- `getCategoryMetadata()`: Dynamic metadata for category pages
- `getBlogMetadata()`: Dynamic metadata for blog posts
- `getPageMetadata()`: Metadata for static pages
- `getCanonicalUrl()`: Helper function for generating canonical URLs

## Structured Data (JSON-LD)

Structured data is implemented using JSON-LD for better search engine understanding:

- `generateProductJsonLd()`: Product schema for product pages
- `generateOrganizationJsonLd()`: Organization schema for the site
- `generateBreadcrumbJsonLd()`: Breadcrumb schema for navigation
- `generateArticleJsonLd()`: Article schema for blog posts

## SEO Components

We've created reusable components for SEO:

- `Breadcrumbs`: A component that displays breadcrumb navigation and adds structured data

## Dynamic Page Metadata

Pages use the Next.js `generateMetadata` function to create dynamic metadata:

```typescript
export async function generateMetadata({
  params,
}: {
  params: {slug: string};
}): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }

  return getProductMetadata(product, params.slug);
}
```

## Robots.txt and Sitemap

We've implemented:

- `robots.ts`: Controls search engine access to the site
- `sitemap.ts`: Dynamically generates a sitemap from products, categories, and blog posts

## Web App Manifest

A web app manifest is provided for PWA support:

- `manifest.ts`: Defines icons, colors, and other PWA properties

## Environment Variables

Environment variables are managed through:

- `lib/env.ts`: Provides type-safe access to environment variables
- `.env.example`: Documents required environment variables

## Implementation Details

### Canonical URLs

All pages include canonical URLs to prevent duplicate content issues:

```typescript
alternates: {
  canonical: getCanonicalUrl(`product/${slug}`),
},
```

### Open Graph and Twitter Cards

Rich social media previews are implemented:

```typescript
openGraph: {
  type: "website",
  title,
  description,
  url: getCanonicalUrl(`product/${slug}`),
  images: [
    {
      url: imageUrl,
      width: 1200,
      height: 630,
      alt: title,
    },
  ],
},
twitter: {
  card: "summary_large_image",
  title,
  description,
  images: [imageUrl],
  creator: siteConfig.twitterHandle,
},
```

### Breadcrumb Navigation

Breadcrumbs improve user experience and SEO:

```typescript
<Breadcrumbs items={breadcrumbItems} className="border-b border-gray-200 pb-3" />
```

## Usage

To use these SEO features in a new page:

1. Import the necessary utilities:

   ```typescript
   import {getPageMetadata} from "@/lib/metadata";
   import {Breadcrumbs} from "@/components/Breadcrumbs";
   ```

2. Generate metadata for the page:

   ```typescript
   export const generateMetadata = (): Metadata => {
     return getPageMetadata("Page Title", "page-path", "Page description");
   };
   ```

3. Add breadcrumbs to the page:

   ```typescript
   const breadcrumbItems = [
     {
       label: "Parent Page",
       href: "/parent",
     },
     {
       label: "Current Page",
       href: "/parent/current",
       isCurrent: true,
     },
   ];

   <Breadcrumbs items={breadcrumbItems} />
   ```

4. Add structured data if needed:

   ```typescript
   import Script from "next/script";
   import { generateSomeJsonLd } from "@/lib/structured-data";

   const jsonLd = generateSomeJsonLd(...);

   <Script
     id="some-jsonld"
     type="application/ld+json"
     dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
   />
   ```
