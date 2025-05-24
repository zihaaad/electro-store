import {Product} from "@/sanity.types";
import {urlFor} from "@/sanity/lib/image";
import {getCanonicalUrl, siteConfig} from "./metadata";

interface StructuredProduct {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  image?: string;
  sku: string;
  mpn: string;
  brand: {
    "@type": string;
    name: string;
  };
  offers: {
    "@type": string;
    url: string;
    priceCurrency: string;
    price: string;
    priceValidUntil: string;
    availability: string;
    seller: {
      "@type": string;
      name: string;
    };
  };
  aggregateRating?: {
    "@type": string;
    ratingValue: string;
    reviewCount: number;
  };
}

/**
 * Generate Product JSON-LD structured data
 */
export function generateProductJsonLd(
  product: Product,
  slug: string
): StructuredProduct | null {
  if (!product) return null;

  const productPrice = product.price || 0;
  const discount = product.discount || 0;
  const price = discount
    ? productPrice - (productPrice * discount) / 100
    : productPrice;

  const imageUrl =
    product.images && product.images.length > 0
      ? urlFor(product.images[0]).width(1200).height(1200).url()
      : undefined;

  // Get brand name safely
  let brandName = siteConfig.name;
  try {
    if (
      product.brand &&
      typeof product.brand === "object" &&
      "_ref" in product.brand
    ) {
      // This is a placeholder - in reality, you'd need to fetch the brand name
      // from Sanity using the reference ID
      brandName = "Brand Name"; // Placeholder
    }
  } catch (error) {
    console.error("Error getting brand name:", error);
  }

  const structuredData: StructuredProduct = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name || "Product",
    description: product.shortDescription || "",
    image: imageUrl,
    sku: product._id,
    mpn: product._id,
    brand: {
      "@type": "Brand",
      name: brandName,
    },
    offers: {
      "@type": "Offer",
      url: getCanonicalUrl(`product/${slug}`),
      priceCurrency: "USD",
      price: price.toFixed(2),
      priceValidUntil: new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
      ).toISOString(),
      availability:
        product.stock && product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: siteConfig.name,
      },
    },
  };

  // Add review data if available
  if (product.ratings && product.ratings.length > 0) {
    const avgRating =
      product.ratings.reduce((acc, rating) => acc + rating, 0) /
      product.ratings.length;

    structuredData.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: avgRating.toFixed(1),
      reviewCount: product.ratings.length,
    };
  }

  return structuredData;
}

/**
 * Generate Organization JSON-LD structured data
 */
export function generateOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    sameAs: [
      "https://www.facebook.com/electro",
      "https://www.instagram.com/electro",
      "https://twitter.com/electro",
    ],
  };
}

/**
 * Generate BreadcrumbList JSON-LD structured data
 */
export function generateBreadcrumbJsonLd(items: {name: string; url: string}[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate Article JSON-LD structured data for blog posts
 */
export function generateArticleJsonLd(
  title: string,
  slug: string,
  description: string,
  imageUrl: string,
  publishedTime: string,
  modifiedTime: string,
  authorName: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    image: imageUrl,
    datePublished: publishedTime,
    dateModified: modifiedTime,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": getCanonicalUrl(`blog/${slug}`),
    },
  };
}
