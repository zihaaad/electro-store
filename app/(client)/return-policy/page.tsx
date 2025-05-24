import React from "react";
import {Title} from "@/components/ui/text";
import {Metadata} from "next";
import {getPageMetadata} from "@/lib/metadata";

export const metadata: Metadata = getPageMetadata(
  "Return Policy",
  "return-policy",
  "Return policy for Electro - Your trusted electronics store"
);

export default function ReturnPolicy() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <Title className="text-3xl mb-8">Return Policy</Title>

      <div className="space-y-6 text-gray-700">
        <section>
          <h2 className="text-xl font-medium mb-4 text-gray-900">
            Business Model
          </h2>
          <p className="mb-3">
            Electro operates as a reseller of electronic products. We purchase
            products from authorized distributors and manufacturers and sell
            them to our customers. We do not manufacture our own products.
          </p>
          <p>
            Our return policy is designed to provide you with a smooth shopping
            experience while complying with applicable laws and regulations.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-4 text-gray-900">
            Return Eligibility
          </h2>
          <p className="mb-3">
            We want you to be completely satisfied with your purchase. If
            you&apos;re not entirely happy, we&apos;re here to help.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              You have 30 days from the date of delivery to return your item
            </li>
            <li>
              To be eligible for a return, the item must be unused, in its
              original packaging, and in the same condition that you received it
            </li>
            <li>
              Certain items cannot be returned, including personalized products
              and software with broken seals
            </li>
            <li>
              For defective products covered by manufacturer warranty, we will
              assist you in processing warranty claims with the manufacturer
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-4 text-gray-900">
            How to Initiate a Return
          </h2>
          <p className="mb-3">
            To start the return process, please follow these steps:
          </p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Log in to your account and go to your order history</li>
            <li>Select the order containing the item(s) you wish to return</li>
            <li>Follow the prompts to complete the return request form</li>
            <li>
              You will receive a confirmation email with shipping instructions
              and a return label
            </li>
          </ol>
          <p className="mt-3">
            All returns must be initiated within the 30-day return period. Once
            your return request is approved, you will have 14 days to ship the
            item back to us.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-4 text-gray-900">
            Return Shipping
          </h2>
          <p className="mb-3">
            To return your product, you should mail your product to:
          </p>
          <p className="mb-3">
            Electro Returns Department
            <br />
            [Your Return Address]
            <br />
            [City, State, ZIP]
          </p>
          <p className="mb-3">
            You will be responsible for paying for your own shipping costs for
            returning your item. Shipping costs are non-refundable.
          </p>
          <p>
            We recommend using a trackable shipping service and purchasing
            shipping insurance for items of value. We cannot guarantee that we
            will receive your returned item.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-4 text-gray-900">Refunds</h2>
          <p className="mb-3">
            Once we receive and inspect your return, we will notify you about
            the status of your refund.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              If approved, your refund will be processed within 3-5 business
              days
            </li>
            <li>
              Refunds will be issued to the original payment method used for the
              purchase
            </li>
            <li>Shipping costs are non-refundable</li>
            <li>A restocking fee of 15% may apply to certain returns</li>
          </ul>
          <p className="mt-3">
            Depending on your payment provider, it may take 5-10 business days
            for the refund to appear in your account after it has been
            processed.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-4 text-gray-900">Exchanges</h2>
          <p className="mb-3">
            We do not process direct exchanges. If you need to exchange an item
            for a different size or model, please return the original item and
            place a new order for the desired product.
          </p>
          <p>
            This ensures that you receive the item you want as quickly as
            possible without waiting for the return process to complete.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-4 text-gray-900">
            Damaged or Defective Items
          </h2>
          <p className="mb-3">
            If you receive a damaged or defective item, please contact our
            customer service team within 48 hours of delivery. We will arrange
            for a replacement or refund as appropriate.
          </p>
          <p className="mb-3">
            Please provide photos of the damaged item and packaging to help us
            process your claim more efficiently.
          </p>
          <p>
            For items damaged during shipping, we may need to file a claim with
            the shipping carrier. Your cooperation in providing documentation
            will help expedite this process.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-4 text-gray-900">
            Warranty Information
          </h2>
          <p className="mb-3">
            Most electronic products sold on our website come with a
            manufacturer&apos;s warranty. The warranty period varies by product
            and manufacturer.
          </p>
          <p className="mb-3">
            For warranty claims, please refer to the warranty information
            included with your product or contact our customer service team for
            assistance.
          </p>
          <p>
            As a reseller, we pass along the manufacturer&apos;s warranty to
            you. We do not offer additional warranties unless explicitly stated
            on the product page. For warranty service, we will assist you in
            contacting the appropriate manufacturer or service center.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-4 text-gray-900">
            Payment and Refund Processing
          </h2>
          <p className="mb-3">
            We use Stripe as our payment processor. All payments and refunds are
            processed securely through Stripe&apos;s platform.
          </p>
          <p className="mb-3">
            Refunds are processed through the same payment method used for the
            original purchase. Depending on your payment provider, it may take
            5-10 business days for the refund to appear in your account.
          </p>
          <p>
            For any payment or refund issues, please contact our customer
            support team at{" "}
            <a
              href="mailto:support@electro.com"
              className="text-blue-600 hover:underline">
              support@electro.com
            </a>
            .
          </p>
        </section>

        <div className="text-sm text-gray-500 mt-8">
          Last Updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
