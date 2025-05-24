import {MetadataRoute} from "next";
import {siteConfig} from "@/lib/metadata";
import {client} from "@/sanity/lib/client";

type SitemapItem = {
  url: string;
  lastModified?: string | Date;
  changeFrequency?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
};

type SanityDocument = {
  slug: string;
  _updatedAt: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: SitemapItem[] = [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/products`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/categories`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/deal`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/shipping-policy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/return-policy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/terms-and-conditions`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  try {
    // Fetch all products
    const products = await client.fetch<SanityDocument[]>(`
      *[_type == "product" && defined(slug.current)] {
        "slug": slug.current,
        _updatedAt
      }
    `);

    const productRoutes = products.map((product: SanityDocument) => ({
      url: `${siteConfig.url}/product/${product.slug}`,
      lastModified: product._updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

    // Fetch all categories
    const categories = await client.fetch<SanityDocument[]>(`
      *[_type == "category" && defined(slug.current)] {
        "slug": slug.current,
        _updatedAt
      }
    `);

    const categoryRoutes = categories.map((category: SanityDocument) => ({
      url: `${siteConfig.url}/category/${category.slug}`,
      lastModified: category._updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

    // Fetch all blog posts
    const blogPosts = await client.fetch<SanityDocument[]>(`
      *[_type == "blog" && defined(slug.current)] {
        "slug": slug.current,
        _updatedAt
      }
    `);

    const blogRoutes = blogPosts.map((post: SanityDocument) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: post._updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

    return [...routes, ...productRoutes, ...categoryRoutes, ...blogRoutes];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return routes;
  }
}
