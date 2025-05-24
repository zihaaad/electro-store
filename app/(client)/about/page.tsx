import React from "react";
import {Title} from "@/components/ui/text";

export const metadata = {
  title: "About Us | Electro",
  description: "Learn more about Electro - Your trusted electronics store",
};

export default function About() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <Title className="text-3xl mb-8">About Electro</Title>

      <div className="space-y-6 text-gray-700">
        <section>
          <h2 className="text-xl font-medium mb-4 text-gray-900">Our Story</h2>
          <p className="mb-3">
            Founded in 2020, Electro was born from a passion for cutting-edge
            technology and a vision to make high-quality electronics accessible
            to everyone. What started as a small online store has grown into a
            trusted destination for tech enthusiasts and everyday consumers
            alike.
          </p>
          <p>
            Our journey began when our founders, tech enthusiasts themselves,
            noticed a gap in the market for a customer-focused electronics
            retailer that prioritizes quality, affordability, and exceptional
            service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-4 text-gray-900">
            Our Mission
          </h2>
          <p>
            At Electro, our mission is to enhance lives through technology by
            providing carefully curated, high-quality electronic products at
            competitive prices, backed by exceptional customer service. We
            strive to make the latest technological innovations accessible to
            everyone while ensuring a seamless shopping experience from browsing
            to delivery.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-4 text-gray-900">
            What Sets Us Apart
          </h2>
          <div className="space-y-3">
            <div>
              <h3 className="font-medium text-gray-900">Curated Selection</h3>
              <p>
                We handpick every product in our inventory, ensuring that we
                only offer items that meet our high standards for quality,
                performance, and value.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-gray-900">Expert Team</h3>
              <p>
                Our team consists of tech enthusiasts and industry experts who
                are passionate about electronics and committed to helping you
                find the perfect products for your needs.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-gray-900">
                Customer-First Approach
              </h3>
              <p>
                We believe in building lasting relationships with our customers
                through honest advice, transparent policies, and responsive
                support.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-gray-900">Quality Assurance</h3>
              <p>
                Every product goes through a rigorous quality check before being
                shipped to ensure you receive only the best.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-4 text-gray-900">Our Values</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-medium">Integrity:</span> We operate with
              honesty and transparency in all our dealings.
            </li>
            <li>
              <span className="font-medium">Excellence:</span> We strive for
              excellence in our products, services, and customer interactions.
            </li>
            <li>
              <span className="font-medium">Innovation:</span> We embrace
              technological advancements and continuously evolve our offerings.
            </li>
            <li>
              <span className="font-medium">Accessibility:</span> We believe
              quality technology should be accessible to everyone.
            </li>
            <li>
              <span className="font-medium">Sustainability:</span> We are
              committed to environmentally responsible practices in our
              operations.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-4 text-gray-900">
            Our Commitment
          </h2>
          <p>
            We are committed to providing you with an exceptional shopping
            experience. From the moment you visit our website to the day your
            order arrives at your doorstep, we strive to exceed your
            expectations. Your satisfaction is our priority, and we continuously
            work to improve our services based on your feedback.
          </p>
        </section>

        <div className="text-center mt-8">
          <p className="text-lg font-medium text-gray-900">
            Thank you for choosing Electro as your trusted electronics partner.
          </p>
        </div>
      </div>
    </div>
  );
}
