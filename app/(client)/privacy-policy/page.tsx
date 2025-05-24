import React from "react";
import {Title} from "@/components/ui/text";

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Electro - Your trusted electronics store",
};

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <Title className="text-3xl mb-8">Privacy Policy</Title>

      <div className="space-y-6 text-gray-700">
        <section>
          <h2 className="text-xl font-medium mb-4 text-gray-900">
            Introduction
          </h2>
          <p className="mb-3">
            At Electro, we respect your privacy and are committed to protecting
            your personal data. This Privacy Policy explains how we collect,
            use, and safeguard your information when you visit our website and
            make purchases.
          </p>
          <p>
            Please read this Privacy Policy carefully. By accessing or using our
            website, you acknowledge that you have read and understood this
            Privacy Policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-4 text-gray-900">
            About Our Business
          </h2>
          <p className="mb-3">
            Electro is an online reseller of electronic products. We sell
            products manufactured by various brands and do not produce our own
            branded merchandise. We purchase products from authorized
            distributors and manufacturers to resell to our customers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-4 text-gray-900">
            Information We Collect
          </h2>
          <p className="mb-3">
            We collect several types of information from and about users of our
            website, including:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Personal identifiers such as name, email address, shipping
              address, billing address, and phone number
            </li>
            <li>Payment information (processed securely through Stripe)</li>
            <li>Order history and product preferences</li>
            <li>
              Device and usage information when you interact with our website
            </li>
            <li>
              Authentication data when you register or log in using Google
            </li>
            <li>
              Communications you send to us, including customer support
              inquiries
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-4 text-gray-900">
            How We Use Your Information
          </h2>
          <p className="mb-3">
            We use your information for the following purposes:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Process and fulfill your orders</li>
            <li>
              Communicate with you about your orders, products, and services
            </li>
            <li>Provide customer support and respond to your inquiries</li>
            <li>Improve our website and customer experience</li>
            <li>Send promotional communications (if you&apos;ve opted in)</li>
            <li>Protect against fraudulent or unauthorized transactions</li>
            <li>Comply with our legal obligations</li>
            <li>Verify your identity when you register or log in</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-4 text-gray-900">
            Legal Basis for Processing
          </h2>
          <p className="mb-3">
            We process your personal data based on the following legal grounds:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>To perform our contract with you when you place an order</li>
            <li>To comply with our legal obligations</li>
            <li>For our legitimate business interests</li>
            <li>With your consent, where applicable</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-4 text-gray-900">
            Payment Processing
          </h2>
          <p className="mb-3">
            We use Stripe for payment processing. When you make a purchase, your
            payment information is processed directly by Stripe. We do not store
            your full credit card details on our servers.
          </p>
          <p className="mb-3">
            The payment information you provide is encrypted and transmitted
            directly to Stripe. This process is protected by encryption
            technology that prevents your information from being read by
            unauthorized parties.
          </p>
          <p>
            Stripe&apos;s use of your personal information is governed by their
            Privacy Policy. We recommend you review their policy at{" "}
            <a
              href="https://stripe.com/privacy"
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer">
              https://stripe.com/privacy
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-4 text-gray-900">
            Data Retention
          </h2>
          <p className="mb-3">
            We retain your personal information for as long as necessary to
            fulfill the purposes outlined in this Privacy Policy, unless a
            longer retention period is required or permitted by law. Order
            information is typically kept for 7 years to comply with tax and
            accounting regulations.
          </p>
          <p>
            When we no longer need to process your personal data, we will delete
            or anonymize it or, if this is not possible (for example, because
            your personal data has been stored in backup archives), then we will
            securely store your personal data and isolate it from any further
            processing until deletion is possible.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-4 text-gray-900">
            Data Security
          </h2>
          <p className="mb-3">
            We implement appropriate security measures to protect your personal
            information. These measures include encryption, access controls, and
            secure networks.
          </p>
          <p>
            However, no method of transmission over the Internet or electronic
            storage is 100% secure, so we cannot guarantee absolute security. If
            you have reason to believe that your interaction with us is no
            longer secure, please contact us immediately.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-4 text-gray-900">
            Your Rights
          </h2>
          <p className="mb-3">
            Depending on your location, you may have the following rights:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access and receive a copy of your personal data</li>
            <li>Rectify inaccurate personal data</li>
            <li>Request deletion of your personal data</li>
            <li>Object to or restrict processing of your personal data</li>
            <li>Data portability</li>
            <li>Withdraw consent (where processing is based on consent)</li>
          </ul>
          <p className="mt-3">
            To exercise these rights, please contact us using the information
            provided in the &quot;Contact Us&quot; section below. We will
            respond to your request within the timeframe required by applicable
            law.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-4 text-gray-900">
            Cookies and Tracking Technologies
          </h2>
          <p className="mb-3">
            We use cookies and similar tracking technologies to track activity
            on our website and store certain information. Cookies are files with
            a small amount of data which may include an anonymous unique
            identifier.
          </p>
          <p>
            You can instruct your browser to refuse all cookies or to indicate
            when a cookie is being sent. However, if you do not accept cookies,
            you may not be able to use some portions of our website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-4 text-gray-900">
            Third-Party Services
          </h2>
          <p className="mb-3">
            Our website may contain links to third-party websites. These
            third-party sites have separate and independent privacy policies. We
            therefore have no responsibility or liability for the content and
            activities of these linked sites.
          </p>
          <p>
            We may use third-party service providers to help us operate our
            business and the website or administer activities on our behalf.
            These include:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Stripe for payment processing</li>
            <li>Google for authentication and analytics</li>
            <li>Shipping carriers to deliver your orders</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-4 text-gray-900">
            International Data Transfers
          </h2>
          <p>
            Your personal data may be transferred to, and processed in,
            countries other than the country in which you reside. These
            countries may have data protection laws that are different from the
            laws of your country. We ensure that appropriate safeguards are in
            place to protect your personal data when it is transferred
            internationally.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-4 text-gray-900">
            Updates to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. The updated
            version will be indicated by an updated &quot;Last Updated&quot;
            date and the updated version will be effective as soon as it is
            accessible.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-4 text-gray-900">Contact Us</h2>
          <p className="mb-3">
            If you have questions about this Privacy Policy or wish to exercise
            your rights, please contact us at:
          </p>
          <p>
            Email:{" "}
            <a
              href="mailto:privacy@electro.com"
              className="text-blue-600 hover:underline">
              privacy@electro.com
            </a>
          </p>
          <p className="mt-2">Address: [Your Business Address]</p>
        </section>

        <div className="text-sm text-gray-500 mt-8">
          Last Updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
