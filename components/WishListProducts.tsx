"use client";

import useStore from "@/store";
import {useState} from "react";
import Container from "./Container";
import {Heart, ShoppingCart, Trash} from "lucide-react";
import {Button} from "./ui/button";
import Link from "next/link";
import {Product} from "@/sanity.types";
import toast from "react-hot-toast";
import Image from "next/image";
import {urlFor} from "@/sanity/lib/image";
import PriceFormatter from "./PriceFormatter";
import AddToCartButton from "./AddToCartButton";
import {Badge} from "./ui/badge";
import Title from "./Title";
import {Card, CardContent} from "./ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const WishListProducts = () => {
  const [visibleProducts, setVisibleProducts] = useState(12);
  const {favoriteProduct, removeFromFavorite, resetFavorite} = useStore();

  const loadMore = () => {
    setVisibleProducts((prev) => Math.min(prev + 8, favoriteProduct.length));
  };

  const handleResetWishlist = () => {
    const confirmReset = window.confirm(
      "Are you sure you want to reset your wishlist?"
    );
    if (confirmReset) {
      resetFavorite();
      toast.success("Wishlist reset successfully");
    }
  };

  return (
    <Container className="py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-shop_dark_green" />
          <Title>My Wishlist</Title>
        </div>

        {favoriteProduct?.length > 0 && (
          <Button
            onClick={handleResetWishlist}
            variant="outline"
            size="sm"
            className="text-red-600 border-red-200 hover:bg-red-50">
            <Trash className="h-4 w-4 mr-1.5" />
            Clear Wishlist
          </Button>
        )}
      </div>

      {favoriteProduct?.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {favoriteProduct
              ?.slice(0, visibleProducts)
              ?.map((product: Product) => (
                <Card
                  key={product?._id}
                  className="group overflow-hidden hover:shadow-md transition-all duration-300 border border-gray-200 flex flex-col">
                  <CardContent className="p-0 relative flex-grow">
                    {/* Product image */}
                    <Link
                      href={`/product/${product?.slug?.current}`}
                      className="block relative pt-[100%] overflow-hidden bg-gray-50">
                      {product?.images && (
                        <Image
                          src={urlFor(product?.images[0]).url()}
                          alt={product?.name || "Product image"}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-contain group-hover:scale-105 transition-transform duration-500"
                        />
                      )}

                      {/* Stock badge */}
                      {(product?.stock as number) <= 0 && (
                        <Badge
                          variant="destructive"
                          className="absolute top-3 left-3">
                          Out of Stock
                        </Badge>
                      )}

                      {/* Categories */}
                      {product?.categories && product.categories.length > 0 && (
                        <div className="absolute bottom-3 left-3">
                          <Badge
                            variant="secondary"
                            className="text-xs bg-white/90 text-gray-700 border-0">
                            {product.categories.join(", ")}
                          </Badge>
                        </div>
                      )}
                    </Link>

                    {/* Product details */}
                    <div className="p-4 flex flex-col h-[calc(100%-100%)]">
                      <Link
                        href={`/product/${product?.slug?.current}`}
                        className="block">
                        <h3 className="font-medium text-gray-900 hover:text-shop_dark_green transition-colors mb-1 line-clamp-2">
                          {product?.name}
                        </h3>
                      </Link>

                      <div className="mt-auto">
                        <div className="mt-2">
                          <PriceFormatter
                            amount={product?.price}
                            className="font-semibold text-gray-900"
                          />
                          {product?.discount && product.discount > 0 && (
                            <span className="block text-xs text-gray-500 line-through">
                              <PriceFormatter
                                amount={
                                  (product?.price || 0) /
                                  (1 - product.discount / 100)
                                }
                              />
                            </span>
                          )}
                        </div>

                        {product?.variant && (
                          <p className="text-xs text-gray-500 mt-1 capitalize">
                            Variant: {product.variant}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>

                  {/* Action buttons - moved to bottom of card */}
                  <div className="px-4 pb-4 mt-auto flex items-center justify-between gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 border-red-100"
                            onClick={() => {
                              removeFromFavorite(product?._id);
                              toast.success("Product removed from wishlist");
                            }}>
                            <Trash className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                          Remove from wishlist
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <AddToCartButton
                      product={product}
                      className="flex-1 bg-shop_dark_green/10 text-shop_dark_green hover:bg-shop_dark_green hover:text-white"
                    />
                  </div>
                </Card>
              ))}
          </div>

          {visibleProducts < favoriteProduct?.length && (
            <div className="flex justify-center mt-8">
              <Button
                onClick={loadMore}
                variant="outline"
                className="border-shop_dark_green text-shop_dark_green hover:bg-shop_dark_green hover:text-white">
                Load More Items
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="flex min-h-[400px] flex-col items-center justify-center space-y-6 px-4 text-center bg-gray-50 rounded-lg">
          <div className="relative mb-4">
            <div className="absolute -top-1 -right-1 h-4 w-4 animate-ping rounded-full bg-muted-foreground/20" />
            <Heart className="h-16 w-16 text-gray-300" strokeWidth={1.5} />
          </div>
          <div className="space-y-2 max-w-md">
            <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
              Your wishlist is empty
            </h2>
            <p className="text-gray-500">
              Save items you love to your wishlist. Review them anytime and
              easily move them to the cart.
            </p>
          </div>
          <Button
            asChild
            className="bg-shop_dark_green hover:bg-shop_dark_green/90">
            <Link href="/shop">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Continue Shopping
            </Link>
          </Button>
        </div>
      )}
    </Container>
  );
};

export default WishListProducts;
