import CategoryProducts from "@/components/CategoryProducts";
import Container from "@/components/Container";
import Title from "@/components/Title";
import {getCategoryMetadata} from "@/lib/metadata";
import {getCategories} from "@/sanity/queries";
import {Metadata} from "next";
import React from "react";
import {Category} from "@/sanity.types";

export async function generateMetadata({
  params,
}: {
  params: {slug: string};
}): Promise<Metadata> {
  const slug = params.slug;
  const categories = await getCategories();
  const category = categories.find(
    (cat: Category & {productCount?: number}) => cat.slug?.current === slug
  );

  const title = category?.title || slug.replace(/-/g, " ");
  const description =
    category?.description || `Browse our collection of ${title} products`;

  return getCategoryMetadata(title, slug, description);
}

const CategoryPage = async ({params}: {params: Promise<{slug: string}>}) => {
  const categories = await getCategories();
  const {slug} = await params;

  // Find current category
  const currentCategory = categories.find(
    (cat: Category & {productCount?: number}) => cat.slug?.current === slug
  );
  const categoryTitle = currentCategory?.title || slug.replace(/-/g, " ");

  return (
    <div className="py-6 md:py-10">
      <Container>
        <div className="flex flex-col space-y-4">
          <div className="bg-white px-4 md:px-6 ">
            <Title className="text-xl md:text-2xl mb-2">
              Products in{" "}
              <span className="font-bold text-green-600 capitalize">
                {categoryTitle}
              </span>
            </Title>

            {currentCategory?.description && (
              <p className="text-gray-600 text-sm md:text-base">
                {currentCategory.description}
              </p>
            )}
          </div>

          <div className="bg-white p-4 md:p-6 ">
            <CategoryProducts categories={categories} slug={slug} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CategoryPage;
