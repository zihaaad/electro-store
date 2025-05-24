import CartClient from "./CartClient";
import {Metadata} from "next";
import {getPageMetadata} from "@/lib/metadata";

export const metadata: Metadata = getPageMetadata(
  "Shopping Cart",
  "cart",
  "View and manage your shopping cart at Electro"
);

export default function CartPage() {
  return <CartClient />;
}
