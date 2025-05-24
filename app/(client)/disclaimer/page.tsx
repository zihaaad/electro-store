import React from "react";
import {Title} from "@/components/ui/text";
import {Metadata} from "next";
import {getPageMetadata} from "@/lib/metadata";

export const metadata: Metadata = getPageMetadata(
  "Disclaimer",
  "disclaimer",
  "Disclaimer for Electro - Your trusted electronics store"
);

export default function Disclaimer() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <Title className="text-3xl mb-8">Disclaimer</Title>

      <div className="space-y-6 text-gray-700">
        <section>
          <h2 className="text-xl font-medium mb-4 text-gray-900">
            Business Model
          </h2>
          <p className="mb-3">
            Electro operates as a reseller of electronic products. We do not
            manufacture our own products but instead sell products from various
            brands and manufacturers. We are not affiliated with or endorsed by
            the manufacturers of the products we sell, except where explicitly
            stated.
          </p>
          <p>
            As a reseller, we strive to provide accurate information about the
            products we sell, but we rely on information provided by
            manufacturers and distributors. While we make every effort to ensure
            the accuracy of product information, we cannot guarantee that all
            information is complete or current.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-4 text-gray-900">
            Website Content
          </h2>
          <p className="mb-3">
            The information provided on Electro is for general informational
            purposes only. All information on the site is provided in good
            faith, however, we make no representation or warranty of any kind,
            express or implied, regarding the accuracy, adequacy, validity,
            reliability, availability, or completeness of any information on the
            site.
          </p>
          <p>
            We reserve the right to make additions, deletions, or modifications
            to the contents on the site at any time without prior notice.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-4 text-gray-900">
            Product Information
          </h2>
          <p className="mb-3">
            We strive to provide accurate product descriptions, specifications,
            and images. However, we do not warrant that product descriptions or
            other content on this site is accurate, complete, reliable, current,
            or error-free.
          </p>
          <p className="mb-3">
            Colors of products displayed on the website may vary slightly from
            the actual products due to differences in display settings and
            lighting conditions.
          </p>
          <p>
            Product warranties, if any, are provided by the manufacturers and
            not by us. We pass along manufacturer warranties to our customers
            but do not offer additional warranties unless explicitly stated.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-4 text-gray-900">
            Pricing and Availability
          </h2>
          <p className="mb-3">
            All prices displayed on our website are subject to change without
            notice. We reserve the right to modify or discontinue any product
            without notice.
          </p>
          <p>
            We are not responsible for any pricing, typographical, or
            photographic errors. The availability of products on the website
            does not imply or warrant that these products will be available at
            all times.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-4 text-gray-900">
            Payment Processing
          </h2>
          <p className="mb-3">
            We use Stripe as our payment processor. While we take reasonable
            measures to ensure secure transactions, we cannot guarantee the
            security of information transmitted to Stripe during the payment
            process.
          </p>
          <p>
            By making a purchase on our website, you acknowledge that your
            payment information is being processed by Stripe and is subject to
            their terms of service and privacy policy. We do not store complete
            payment information on our servers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-4 text-gray-900">
            External Links
          </h2>
          <p>
            Our website may contain links to external websites that are not
            provided or maintained by or in any way affiliated with Electro.
            Please note that we do not guarantee the accuracy, relevance,
            timeliness, or completeness of any information on these external
            websites.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-4 text-gray-900">
            Limitation of Liability
          </h2>
          <p className="mb-3">
            In no event shall Electro, nor its directors, employees, partners,
            agents, suppliers, or affiliates, be liable for any indirect,
            incidental, special, consequential, or punitive damages, including
            without limitation, loss of profits, data, use, goodwill, or other
            intangible losses, resulting from:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Your access to or use of or inability to access or use the website
            </li>
            <li>Any conduct or content of any third party on the website</li>
            <li>Any content obtained from the website</li>
            <li>
              Unauthorized access, use, or alteration of your transmissions or
              content
            </li>
            <li>
              Any defects, failures, or delays in the products sold on our
              website
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-4 text-gray-900">
            Indemnification
          </h2>
          <p>
            You agree to defend, indemnify, and hold harmless Electro, its
            affiliates, licensors, and service providers, and its and their
            respective officers, directors, employees, contractors, agents,
            licensors, suppliers, successors, and assigns from and against any
            claims, liabilities, damages, judgments, awards, losses, costs,
            expenses, or fees (including reasonable attorneys&apos; fees)
            arising out of or relating to your violation of these Terms of Use
            or your use of the website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-4 text-gray-900">
            Customer Support
          </h2>
          <p>
            While we strive to provide excellent customer support, we do not
            guarantee that our support services will be available at all times
            or will resolve all issues to your satisfaction. We will make
            reasonable efforts to assist with product-related issues, but some
            matters may need to be directed to the product manufacturer.
          </p>
        </section>

        <div className="text-sm text-gray-500 mt-8">
          Last Updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
