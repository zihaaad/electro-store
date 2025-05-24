import NoAccess from "@/components/NoAccess";
import WishListProducts from "@/components/WishListProducts";
import {currentUser} from "@clerk/nextjs/server";
import React from "react";
import {Metadata} from "next";
import {getPageMetadata} from "@/lib/metadata";

export const metadata: Metadata = getPageMetadata(
  "My Wishlist",
  "wishlist",
  "View and manage your saved wishlist items at Electro"
);

const WishListPage = async () => {
  const user = await currentUser();
  return (
    <>
      {user ? (
        <WishListProducts />
      ) : (
        <NoAccess details="Log in to view your wishlist items. Don't miss out on your cart products to make the payment!" />
      )}
    </>
  );
};

export default WishListPage;
