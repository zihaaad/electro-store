import Shop from "@/components/Shop";
import {getCategories} from "@/sanity/queries";
import React from "react";
import {Metadata} from "next";
import {getPageMetadata} from "@/lib/metadata";

export const metadata: Metadata = getPageMetadata(
  "Shop",
  "shop",
  "Browse our complete collection of electronics, appliances, and gadgets"
);

const ShopPage = async () => {
  const categories = await getCategories();
  return (
    <div className="bg-white">
      <Shop categories={categories} />
    </div>
  );
};

export default ShopPage;
