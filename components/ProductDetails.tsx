"use client";

import React, {useState} from "react";
import {PortableText, PortableTextReactComponents} from "@portabletext/react";
import ProductReviews from "./ProductReviews";
import {TypedObject} from "sanity";

// Custom Portable Text components
const portableTextComponents: Partial<PortableTextReactComponents> = {
  block: {
    h1: ({children}) => <h1 className="text-4xl font-bold my-3">{children}</h1>,
    h2: ({children}) => (
      <h2 className="text-2xl font-semibold my-2">{children}</h2>
    ),
    h3: ({children}) => (
      <h3 className="text-xl font-medium my-2">{children}</h3>
    ),
    normal: ({children}) => (
      <p className="text text-gray-600 my-1.5">{children}</p>
    ),
  },
  list: {
    bullet: ({children}) => (
      <ul className="list-disc ml-5 my-2 space-y-1 text-gray-600">
        {children}
      </ul>
    ),
    number: ({children}) => (
      <ol className="list-decimal ml-5 my-2 space-y-1 text-gray-600">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({children}) => <li>{children}</li>,
    number: ({children}) => <li>{children}</li>,
  },
  marks: {
    strong: ({children}) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({children}) => <em className="italic">{children}</em>,
    link: ({value, children}) => {
      const target = (value?.href || "").startsWith("http")
        ? "_blank"
        : undefined;
      const rel = target === "_blank" ? "noopener noreferrer" : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={rel}
          className="text-shop_light_green hover:underline">
          {children}
        </a>
      );
    },
  },
};

type Review = {
  _id: string;
  rating: number;
  comment: string;
  userName: string;
  createdAt: string;
  isVerified: boolean;
};

type ProductDetailsProps = {
  productId: string;
  description: TypedObject | TypedObject[] | undefined;
  reviews: Review[];
  avgRating: number;
  reviewCount: number;
  canReview: boolean;
};

const ProductDetails = ({
  productId,
  description,
  reviews,
  avgRating,
  reviewCount,
  canReview,
}: ProductDetailsProps) => {
  const [activeTab, setActiveTab] = useState<"description" | "reviews">(
    "description"
  );
  const [reviewsLoaded, setReviewsLoaded] = useState(false);

  const handleTabChange = (tab: "description" | "reviews") => {
    setActiveTab(tab);
    if (tab === "reviews") {
      setReviewsLoaded(true);
    }
  };

  return (
    <div className=" border-gray-200 mt-4">
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => handleTabChange("description")}
          className={`px-6 py-3 text-base font-medium border-b-2 -mb-px transition-colors ${
            activeTab === "description"
              ? "border-shop_dark_green text-shop_dark_green"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}>
          Product Details
        </button>
        <button
          onClick={() => handleTabChange("reviews")}
          className={`px-6 py-3 text-base font-medium border-b-2 -mb-px transition-colors flex items-center gap-1 ${
            activeTab === "reviews"
              ? "border-shop_dark_green text-shop_dark_green"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}>
          Reviews
          {reviewCount > 0 && (
            <span className="bg-gray-100 text-gray-700 rounded-full px-2 py-0.5 text-xs">
              {reviewCount}
            </span>
          )}
        </button>
      </div>

      <div className="py-6">
        {activeTab === "description" && description && (
          <div className="prose max-w-none">
            <PortableText
              value={description}
              components={portableTextComponents}
            />
          </div>
        )}

        {activeTab === "reviews" && reviewsLoaded && (
          <ProductReviews
            productId={productId}
            reviews={reviews}
            avgRating={avgRating}
            reviewCount={reviewCount}
            canReview={canReview}
          />
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
