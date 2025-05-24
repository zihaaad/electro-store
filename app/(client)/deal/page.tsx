import Container from "@/components/Container";
import ProductCard from "@/components/ProductCard";
import Title from "@/components/Title";
import {getDealProducts} from "@/sanity/queries";
import {Product} from "@/sanity.types";
import React from "react";
import {Metadata} from "next";
import {getCategoryMetadata} from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: {slug: string};
}): Promise<Metadata> {
  const slug = params.slug;
  const title = "Hot Deals";
  const description = `Browse our hot deals products`;

  return getCategoryMetadata(title, slug, description);
}

const DealPage = async () => {
  const products = await getDealProducts();
  return (
    <div className="py-10 bg-deal-bg">
      <Container>
        <Title className="mb-5 underline underline-offset-4 decoration-[1px] text-base uppercase tracking-wide">
          Hot Deals of the Week
        </Title>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {products?.map((product: Product) => (
            <ProductCard key={product?._id} product={product} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default DealPage;
