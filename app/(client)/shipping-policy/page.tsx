import React from "react";
import {Title} from "@/components/ui/text";
import {Metadata} from "next";
import {getPageMetadata} from "@/lib/metadata";

export const metadata: Metadata = getPageMetadata(
  "Shipping Policy",
  "shipping-policy",
  "Shipping policy for Electro - Your trusted electronics store"
);

export default function ShippingPolicy() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <Title className="text-3xl mb-8">Shipping Policy</Title>

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
            Our shipping policy is designed to provide you with a smooth
            shopping experience while complying with applicable laws and
            regulations.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-4 text-gray-900">
            Processing Time
          </h2>
          <p className="mb-3">
            At Electro, we strive to process and ship your orders quickly and
            efficiently. All orders are processed within 1-2 business days after
            payment confirmation.
          </p>
          <p>
            Orders placed during weekends or holidays will be processed on the
            next business day. We will notify you via email once your order has
            been processed and is ready for shipping.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-4 text-gray-900">
            Shipping Methods & Timeframes
          </h2>
          <p className="mb-3">
            We offer several shipping options to meet your delivery needs:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-medium">Standard Shipping:</span> 3-5
              business days
            </li>
            <li>
              <span className="font-medium">Express Shipping:</span> 1-2
              business days
            </li>
            <li>
              <span className="font-medium">International Shipping:</span> 7-14
              business days
            </li>
          </ul>
          <p className="mt-3">
            Please note that these timeframes are estimates and may vary
            depending on your location and other factors such as customs
            clearance for international shipments.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-4 text-gray-900">
            Shipping Costs
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Orders over $100: Free standard shipping</li>
            <li>Orders under $100: $5.99 for standard shipping</li>
            <li>Express shipping: Additional $9.99</li>
            <li>International shipping: Calculated at checkout</li>
          </ul>
          <p className="mt-3">
            Shipping costs are calculated based on the weight, dimensions,
            destination, and shipping method selected during checkout.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-4 text-gray-900">
            Order Tracking
          </h2>
          <p className="mb-3">
            Once your order ships, you will receive a confirmation email with a
            tracking number that allows you to monitor the progress of your
            delivery.
          </p>
          <p>
            You can also track your order by logging into your account on our
            website and viewing your order history. If you have any questions
            about your shipment, please contact our customer support team.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-4 text-gray-900">
            International Shipping
          </h2>
          <p className="mb-3">
            We ship to many countries worldwide. Please note that international
            orders may be subject to import duties, taxes, and customs clearance
            fees imposed by the destination country.
          </p>
          <p className="mb-3">
            These additional charges are the responsibility of the recipient and
            are not included in our shipping fees. We recommend contacting your
            local customs office for more information before placing your order.
          </p>
          <p>
            International shipping times may vary significantly depending on
            customs processing and local delivery conditions in your country.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-4 text-gray-900">
            Shipping Restrictions
          </h2>
          <p className="mb-3">
            Certain products may have shipping restrictions to particular
            countries due to local regulations, product specifications, or
            manufacturer restrictions.
          </p>
          <p>
            If we are unable to ship a product to your location, you will be
            notified during the checkout process or shortly after placing your
            order.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-4 text-gray-900">
            Shipping Address
          </h2>
          <p className="mb-3">
            It is your responsibility to provide accurate and complete shipping
            information. We are not responsible for orders shipped to incorrect
            addresses provided by customers.
          </p>
          <p>
            If you need to change your shipping address after placing an order,
            please contact our customer service team immediately. We will try to
            accommodate your request if the order has not yet been processed for
            shipping.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-4 text-gray-900">
            Delivery Issues
          </h2>
          <p className="mb-3">
            If you experience any issues with your delivery, such as delays or
            damaged packaging, please contact our customer support team at{" "}
            <a
              href="mailto:support@electro.com"
              className="text-blue-600 hover:underline">
              support@electro.com
            </a>
            .
          </p>
          <p>
            For items damaged during shipping, we may need to file a claim with
            the shipping carrier. Your cooperation in providing documentation
            will help expedite this process.
          </p>
        </section>

        <div className="text-sm text-gray-500 mt-8">
          Last Updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
