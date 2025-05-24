import {Metadata} from "next";
import {Product} from "@/sanity.types";
import {urlFor} from "@/sanity/lib/image";
import {env, getBaseUrl} from "@/lib/env";

// Base metadata configuration - centralized domain configuration
export const siteConfig = {
  name: "Electro",
  description: "Electro online store, Your one stop shop for all your needs",
  domain: env.DOMAIN,
  url: getBaseUrl(),
  ogImage: "/images/og-image.jpg",
  twitterHandle: "@electro",
};

// Helper to get canonical URL
export function getCanonicalUrl(path: string = ""): string {
  // Remove leading slash if present and the path is not empty
  const normalizedPath = path
    ? path.startsWith("/")
      ? path.slice(1)
      : path
    : "";
  return `${siteConfig.url}${normalizedPath ? `/${normalizedPath}` : ""}`;
}

// Default metadata for the site
export function getDefaultMetadata(): Metadata {
  return {
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteConfig.url,
      title: siteConfig.name,
      description: siteConfig.description,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.name,
      description: siteConfig.description,
      images: [siteConfig.ogImage],
      creator: siteConfig.twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png",
    },
    manifest: `${siteConfig.url}/site.webmanifest`,
  };
}

// Generate product metadata
export function getProductMetadata(product: Product, slug: string): Metadata {
  const title = product.name || "Product";
  const description =
    product.shortDescription || product.name || siteConfig.description;

  // Get the first product image or fallback to default
  const imageUrl =
    product.images && product.images.length > 0
      ? urlFor(product.images[0]).width(1200).height(630).url()
      : siteConfig.ogImage;

  return {
    title,
    description,
    alternates: {
      canonical: getCanonicalUrl(`product/${slug}`),
    },
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
  };
}

// Generate category metadata
export function getCategoryMetadata(
  title: string,
  slug: string,
  description?: string
): Metadata {
  const pageDescription =
    description || `Browse our collection of ${title} products`;

  return {
    title,
    description: pageDescription,
    alternates: {
      canonical: getCanonicalUrl(`category/${slug}`),
    },
    openGraph: {
      type: "website",
      title,
      description: pageDescription,
      url: getCanonicalUrl(`category/${slug}`),
    },
  };
}

// Generate blog metadata
export function getBlogMetadata(
  title: string,
  slug: string,
  description?: string,
  imageUrl?: string
): Metadata {
  const pageDescription = description || `${title} - ${siteConfig.name} Blog`;
  const canonicalUrl = getCanonicalUrl(`blog/${slug}`);

  return {
    title,
    description: pageDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "article",
      title,
      description: pageDescription,
      url: canonicalUrl,
      images: imageUrl
        ? [{url: imageUrl, width: 1200, height: 630, alt: title}]
        : [{url: siteConfig.ogImage, width: 1200, height: 630, alt: title}],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: pageDescription,
      images: imageUrl ? [imageUrl] : [siteConfig.ogImage],
      creator: siteConfig.twitterHandle,
    },
  };
}

// Generate page metadata for static pages
export function getPageMetadata(
  title: string,
  path: string,
  description?: string
): Metadata {
  const pageDescription = description || `${title} - ${siteConfig.name}`;
  const canonicalUrl = getCanonicalUrl(path);

  return {
    title,
    description: pageDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      title,
      description: pageDescription,
      url: canonicalUrl,
    },
  };
}
