import AddToCartButton from "@/components/AddToCartButton";
import Container from "@/components/Container";
import FavoriteButton from "@/components/FavoriteButton";
import ImageView from "@/components/ImageView";
import PriceView from "@/components/PriceView";
import {getProductBySlug} from "@/sanity/queries";
import {CornerDownLeft, StarIcon, Truck} from "lucide-react";
import {notFound} from "next/navigation";
import React from "react";
import {FaRegQuestionCircle} from "react-icons/fa";
import {FiShare2} from "react-icons/fi";
import {RxBorderSplit} from "react-icons/rx";
import {TbTruckDelivery} from "react-icons/tb";
import {PortableText, PortableTextReactComponents} from "@portabletext/react";

// Custom Portable Text components
const portableTextComponents: Partial<PortableTextReactComponents> = {
  block: {
    h1: ({children}) => <h1 className="text-xl font-bold my-3">{children}</h1>,
    h2: ({children}) => (
      <h2 className="text-lg font-semibold my-2">{children}</h2>
    ),
    h3: ({children}) => (
      <h3 className="text-base font-medium my-2">{children}</h3>
    ),
    normal: ({children}) => (
      <p className="text-sm text-gray-600 my-1.5">{children}</p>
    ),
  },
  list: {
    bullet: ({children}) => (
      <ul className="list-disc ml-5 my-2 space-y-1 text-sm text-gray-600">
        {children}
      </ul>
    ),
    number: ({children}) => (
      <ol className="list-decimal ml-5 my-2 space-y-1 text-sm text-gray-600">
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
  return (
    <Container className="flex flex-col md:flex-row gap-10 py-10">
      {product?.images && (
        <ImageView images={product?.images} isStock={product?.stock} />
      )}
      <div className="w-full md:w-1/2 flex flex-col gap-5">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">{product?.name}</h2>
          <div className="border-t border-gray-100 pt-3">
            {product?.description && (
              <PortableText
                value={product.description}
                components={portableTextComponents}
              />
            )}
          </div>
          <div className="flex items-center gap-0.5 text-xs">
            {[...Array(5)].map((_, index) => (
              <StarIcon
                key={index}
                size={12}
                className="text-shop_light_green"
                fill={"#3b9c3c"}
              />
            ))}
            <p className="font-semibold">{`(120)`}</p>
          </div>
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
            <RxBorderSplit className="text-lg" />
            <p>Compare color</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect">
            <FaRegQuestionCircle className="text-lg" />
            <p>Ask a question</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect">
            <TbTruckDelivery className="text-lg" />
            <p>Delivery & Return</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect">
            <FiShare2 className="text-lg" />
            <p>Share</p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="border border-lightColor/25 border-b-0 p-3 flex items-center gap-2.5">
            <Truck size={30} className="text-shop_orange" />
            <div>
              <p className="text-base font-semibold text-black">
                Free Delivery
              </p>
              <p className="text-sm text-gray-500 underline underline-offset-2">
                Enter your Postal code for Delivey Availability.
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
                <span className="underline underline-offset-2">Details</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SingleProductPage;
