import Container from "@/components/Container";
import HomeBanner from "@/components/HomeBanner";
import HomeCategories from "@/components/HomeCategories";
import ProductGrid from "@/components/ProductGrid";
import {getCategories} from "@/sanity/queries";
import {Metadata} from "next";
import {getDefaultMetadata} from "@/lib/metadata";
import React from "react";

// Generate metadata for the home page
export const metadata: Metadata = {
  ...getDefaultMetadata(),
  title: "Electro - Your One-Stop Electronics Shop",
  description:
    "Shop the latest electronics, appliances, and gadgets at the best prices. Fast shipping and excellent customer service guaranteed.",
};

const Home = async () => {
  const categories = await getCategories(6);

  return (
    <Container className="bg-shop-light-pink">
      <HomeBanner />
      <ProductGrid />
      <HomeCategories categories={categories} />
    </Container>
  );
};

export default Home;
