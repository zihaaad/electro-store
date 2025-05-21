"use client";

import {createCheckoutSession, Metadata} from "@/actions/createCheckoutSession";
import Container from "@/components/Container";
import EmptyCart from "@/components/EmptyCart";
import NoAccess from "@/components/NoAccess";
import PriceFormatter from "@/components/PriceFormatter";
import QuantityButtons from "@/components/QuantityButtons";
import Title from "@/components/Title";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {Address} from "@/sanity.types";
import {urlFor} from "@/sanity/lib/image";
import useStore from "@/store";
import {useAuth, useUser} from "@clerk/nextjs";
import {Package, ShoppingBag, Trash} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {useState} from "react";
import toast from "react-hot-toast";
import AddressManager from "@/components/AddressManager";

const CartPage = () => {
  const {
    deleteCartProduct,
    getTotalPrice,
    getItemCount,
    getSubTotalPrice,
    resetCart,
  } = useStore();
  const [loading, setLoading] = useState(false);
  const groupedItems = useStore((state) => state.getGroupedItems());
  const {isSignedIn} = useAuth();
  const {user} = useUser();
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  const handleResetCart = () => {
    const confirmed = window.confirm(
      "Are you sure you want to reset your cart?"
    );
    if (confirmed) {
      resetCart();
      toast.success("Cart reset successfully!");
    }
  };

  const handleCheckout = async () => {
    if (!selectedAddress) {
      toast.error("Please select a delivery address");
      return;
    }

    setLoading(true);
    try {
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? "Unknown",
        customerEmail: user?.emailAddresses[0]?.emailAddress ?? "Unknown",
        clerkUserId: user?.id,
        address: selectedAddress,
      };
      const checkoutUrl = await createCheckoutSession(groupedItems, metadata);
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      toast.error("Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-24 md:pb-10">
      {isSignedIn ? (
        <Container>
          {groupedItems?.length ? (
            <>
              <div className="flex items-center gap-2 py-5">
                <ShoppingBag className="text-darkColor" />
                <Title>Shopping Cart</Title>
              </div>

              <div className="grid lg:grid-cols-3 gap-5 md:gap-8">
                {/* Products List */}
                <div className="lg:col-span-2">
                  <Card className="overflow-hidden">
                    <CardHeader className="bg-gray-50 border-b p-4">
                      <div className="flex justify-between">
                        <CardTitle className="text-lg">
                          Cart Items ({groupedItems.length})
                        </CardTitle>
                        <Button
                          onClick={handleResetCart}
                          size="sm"
                          variant="outline"
                          className="h-8 text-red-600 border-red-200 hover:bg-red-50">
                          <Trash className="h-4 w-4 mr-1" /> Clear Cart
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="divide-y">
                        {groupedItems?.map(({product}) => {
                          const itemCount = getItemCount(product?._id);
                          return (
                            <div
                              key={product?._id}
                              className="p-4 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
                              <div className="flex flex-1 items-start gap-4">
                                {product?.images && (
                                  <Link
                                    href={`/product/${product?.slug?.current}`}
                                    className="border rounded-md overflow-hidden flex-shrink-0 group">
                                    <Image
                                      src={urlFor(product?.images[0]).url()}
                                      alt={product?.name || "Product image"}
                                      width={80}
                                      height={80}
                                      className="w-20 h-20 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                  </Link>
                                )}
                                <div className="flex flex-col justify-between py-1 flex-1">
                                  <div>
                                    <Link
                                      href={`/product/${product?.slug?.current}`}
                                      className="font-medium text-gray-900 hover:text-shop_dark_green line-clamp-2 transition-colors">
                                      {product?.name}
                                    </Link>

                                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-gray-500">
                                      {product?.variant && (
                                        <p className="capitalize">
                                          <span className="text-gray-600">
                                            Variant:
                                          </span>{" "}
                                          {product?.variant}
                                        </p>
                                      )}

                                      <p className="capitalize">
                                        <span className="text-gray-600">
                                          Status:
                                        </span>{" "}
                                        <span
                                          className={
                                            product?.status === "hot"
                                              ? "text-red-600"
                                              : ""
                                          }>
                                          {product?.status}
                                        </span>
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex items-center justify-between mt-2">
                                    <QuantityButtons product={product} />

                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 rounded-full text-gray-500 hover:text-red-600 hover:bg-red-50"
                                            onClick={() => {
                                              deleteCartProduct(product?._id);
                                              toast.success(
                                                "Product removed from cart"
                                              );
                                            }}>
                                            <Trash className="h-4 w-4" />
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent side="bottom">
                                          Remove from cart
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  </div>
                                </div>
                              </div>

                              <div className="flex flex-col items-end">
                                <PriceFormatter
                                  amount={
                                    (product?.price as number) * itemCount
                                  }
                                  className="font-semibold text-gray-900"
                                />
                                {product?.discount && product.discount > 0 && (
                                  <span className="text-xs line-through text-gray-500">
                                    <PriceFormatter
                                      amount={
                                        ((product?.price as number) *
                                          itemCount) /
                                        (1 - product.discount / 100)
                                      }
                                    />
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="flex flex-col gap-5">
                  {/* Order Summary Card */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Package className="h-5 w-5" />
                        Order Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Subtotal</span>
                          <PriceFormatter amount={getSubTotalPrice()} />
                        </div>

                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Discount</span>
                          <PriceFormatter
                            amount={getSubTotalPrice() - getTotalPrice()}
                            className="text-green-600"
                          />
                        </div>

                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Shipping</span>
                          <span className="text-gray-900">Free</span>
                        </div>
                      </div>

                      <Separator />

                      <div className="flex justify-between items-center">
                        <span className="font-medium">Total</span>
                        <PriceFormatter
                          amount={getTotalPrice()}
                          className="text-lg font-bold text-gray-900"
                        />
                      </div>

                      <Button
                        className="w-full bg-shop_dark_green hover:bg-shop_dark_green/90"
                        size="lg"
                        disabled={loading || !selectedAddress}
                        onClick={handleCheckout}>
                        {loading ? "Processing..." : "Checkout"}
                      </Button>

                      {!selectedAddress && (
                        <p className="text-amber-600 text-xs text-center">
                          Please select a delivery address below
                        </p>
                      )}
                    </CardContent>
                  </Card>

                  {/* Address Selection */}
                  <AddressManager
                    onAddressSelect={setSelectedAddress}
                    selectedAddress={selectedAddress}
                  />
                </div>
              </div>

              {/* Mobile Bottom Bar */}
              <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 md:hidden z-10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium">Total:</span>
                  <PriceFormatter
                    amount={getTotalPrice()}
                    className="text-lg font-bold"
                  />
                </div>
                <Button
                  className="w-full bg-shop_dark_green hover:bg-shop_dark_green/90"
                  size="lg"
                  disabled={loading || !selectedAddress}
                  onClick={handleCheckout}>
                  {loading ? "Processing..." : "Checkout"}
                </Button>
              </div>
            </>
          ) : (
            <EmptyCart />
          )}
        </Container>
      ) : (
        <NoAccess />
      )}
    </div>
  );
};

export default CartPage;
