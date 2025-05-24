"use client";

import React from "react";
import Link from "next/link";
import {ChevronRight, Home} from "lucide-react";
import {usePathname} from "next/navigation";
import {generateBreadcrumbJsonLd} from "@/lib/structured-data";
import {getCanonicalUrl} from "@/lib/metadata";
import Script from "next/script";

export type BreadcrumbItem = {
  label: string;
  href: string;
  isCurrent?: boolean;
};

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs = ({items = [], className = ""}: BreadcrumbsProps) => {
  const pathname = usePathname();

  // If no items are provided, generate them from the pathname
  const breadcrumbItems =
    items.length > 0 ? items : generateBreadcrumbsFromPath(pathname);

  // Generate structured data
  const structuredDataItems = [
    {name: "Home", url: getCanonicalUrl()},
    ...breadcrumbItems.map((item) => ({
      name: item.label,
      url: getCanonicalUrl(item.href.replace(/^\//, "")),
    })),
  ];

  const breadcrumbJsonLd = generateBreadcrumbJsonLd(structuredDataItems);

  return (
    <>
      <Script
        id="breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(breadcrumbJsonLd)}}
      />

      <nav aria-label="Breadcrumb" className={`${className}`}>
        <ol className="flex items-center flex-wrap text-sm">
          <li className="flex items-center">
            <Link
              href="/"
              className="text-gray-500 hover:text-shop_dark_green flex items-center">
              <Home size={16} className="mr-1" />
              <span>Home</span>
            </Link>
            {breadcrumbItems.length > 0 && (
              <ChevronRight size={14} className="mx-2 text-gray-400" />
            )}
          </li>

          {breadcrumbItems.map((item, index) => (
            <li key={item.href} className="flex items-center">
              {item.isCurrent ? (
                <span
                  className="text-shop_dark_green font-medium"
                  aria-current="page">
                  {item.label}
                </span>
              ) : (
                <>
                  <Link
                    href={item.href}
                    className="text-gray-500 hover:text-shop_dark_green">
                    {item.label}
                  </Link>
                  {index < breadcrumbItems.length - 1 && (
                    <ChevronRight size={14} className="mx-2 text-gray-400" />
                  )}
                </>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

// Helper function to generate breadcrumbs from pathname
function generateBreadcrumbsFromPath(pathname: string): BreadcrumbItem[] {
  // Skip for homepage
  if (pathname === "/") return [];

  // Split the path into segments
  const segments = pathname.split("/").filter(Boolean);

  // Generate breadcrumb items
  return segments.map((segment, index) => {
    // Create the href for this breadcrumb
    const href = `/${segments.slice(0, index + 1).join("/")}`;

    // Format the label (capitalize and replace hyphens with spaces)
    const label = segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

    // Check if this is the current page
    const isCurrent = index === segments.length - 1;

    return {label, href, isCurrent};
  });
}

export default Breadcrumbs;
