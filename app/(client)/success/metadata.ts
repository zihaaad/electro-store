import {Metadata} from "next";
import {getPageMetadata} from "@/lib/metadata";

export const metadata: Metadata = getPageMetadata(
  "Order Confirmation",
  "success",
  "Your order has been successfully placed at Electro"
);
