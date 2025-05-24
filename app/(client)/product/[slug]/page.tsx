import AddToCartButton from "@/components/AddToCartButton";
import Breadcrumbs from "@/components/Breadcrumbs";
import Container from "@/components/Container";
import FavoriteButton from "@/components/FavoriteButton";
import ImageView from "@/components/ImageView";
import PriceView from "@/components/PriceView";
import ProductDetails from "@/components/ProductDetails";
import ProductRating from "@/components/ProductRating";
import {auth} from "@clerk/nextjs/server";
import {canUserReviewProduct, getProductBySlug} from "@/sanity/queries";
import {CornerDownLeft, Truck} from "lucide-react";
import {Metadata} from "next";
import {notFound} from "next/navigation";
import React from "react";
import ShareButton from "@/components/ShareButton";
import {getProductMetadata} from "@/lib/metadata";

const calculateAverageRating = (ratings: number[] = []) => {
  if (!ratings || ratings.length === 0) return 0;
  const sum = ratings.reduce((acc, rating) => acc + rating, 0);
  return Number((sum / ratings.length).toFixed(1));
};

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

const SingleProductPage = async ({
  params,
}: {
  params: Promise<{slug: string}>;
}) => {
  const {slug} = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return notFound();
  }

  // Calculate average rating
  const avgRating = calculateAverageRating(product.ratings);
  const reviewCount = product.reviewCount || 0;
  const reviews = product.reviews || [];

  // Check if user can review
  const {userId} = await auth();
  let canReview = false;

  if (userId) {
    canReview = await canUserReviewProduct(userId, product._id);
  }

  // Define breadcrumb items
  const breadcrumbItems = [
    {
      label: "Products",
      href: "/shop",
    },
    {
      label: product.name || "Product",
      href: `/product/${slug}`,
      isCurrent: true,
    },
  ];

  return (
    <>
      <Container className="flex flex-col gap-6 py-10">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={breadcrumbItems}
          className=" border-gray-200 pb-1"
        />

        <div className="flex flex-col md:flex-row gap-10 ">
          {product?.images && (
            <ImageView images={product?.images} isStock={product?.stock} />
          )}
          <div className="w-full md:w-1/2 flex flex-col gap-5">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">{product?.name}</h2>

              {/* Short Description */}
              {product?.shortDescription && (
                <div className="text-sm text-gray-600">
                  {product.shortDescription}
                </div>
              )}

              {/* Rating */}
              <ProductRating
                rating={avgRating}
                count={reviewCount}
                size={14}
                className="mt-2"
              />
            </div>
            <div className="space-y-2 border-t border-b border-gray-200 py-5">
              <PriceView
                price={product?.price}
                discount={product?.discount}
                className="text-lg font-bold"
              />
              <p
                className={`px-4 py-1.5 text-sm text-center inline-block font-semibold rounded-lg ${product?.stock === 0 ? "bg-red-100 text-red-600" : "text-green-600 bg-green-100"}`}>
                {(product?.stock as number) > 0 ? "In Stock" : "Out of Stock"}
              </p>
            </div>
            <div className="flex items-center gap-2.5 lg:gap-3">
              <AddToCartButton product={product} />
              <FavoriteButton showProduct={true} product={product} />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-b-gray-200 py-5 -mt-2">
              <div className="flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect">
                <Truck className="text-lg" />
                <p>Shipping & Delivery</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect">
                <CornerDownLeft className="text-lg" />
                <p>Return Policy</p>
              </div>
              <ShareButton
                title={product.name || ""}
                text={product.shortDescription || product.name || ""}
              />
            </div>
            <div className="flex flex-col">
              <div className="border border-lightColor/25 border-b-0 p-3 flex items-center gap-2.5">
                <Truck size={30} className="text-shop_orange" />
                <div>
                  <p className="text-base font-semibold text-black">
                    Free Delivery
                  </p>
                  <p className="text-sm text-gray-500 underline underline-offset-2">
                    Enter your Postal code for Delivery Availability.
                  </p>
                </div>
              </div>
              <div className="border border-lightColor/25 p-3 flex items-center gap-2.5">
                <CornerDownLeft size={30} className="text-shop_orange" />
                <div>
                  <p className="text-base font-semibold text-black">
                    Return Delivery
                  </p>
                  <p className="text-sm text-gray-500 ">
                    Free 30days Delivery Returns.{" "}
                    <span className="underline underline-offset-2">
                      Details
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ProductDetails
          productId={product._id}
          description={product.description}
          reviews={reviews}
          avgRating={avgRating}
          reviewCount={reviewCount}
          canReview={canReview}
        />
      </Container>
    </>
  );
};

export default SingleProductPage;
