import React from "react";
import ContactClient from "./ContactClient";
import {Metadata} from "next";
import {getPageMetadata} from "@/lib/metadata";

export const metadata: Metadata = getPageMetadata(
  "Contact Us",
  "contact",
  "Get in touch with Electro customer support team for any questions or assistance"
);

export default function Contact() {
  return <ContactClient />;
}
