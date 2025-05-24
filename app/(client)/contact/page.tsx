"use client";

import React, {useState} from "react";
import {Title} from "@/components/ui/text";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState({
    type: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({type: "", message: ""});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({type: "success", message: "Message sent successfully!"});
        setFormData({name: "", email: "", message: ""});
      } else {
        setStatus({
          type: "error",
          message: data.message || "Something went wrong. Please try again.",
        });
      }
    } catch {
      setStatus({
        type: "error",
        message: "An error occurred. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <Title className="text-3xl mb-8 text-center">Contact Us</Title>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <section className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
            <h2 className="text-xl font-medium mb-4 text-gray-900">
              Get in Touch
            </h2>
            <p className="text-gray-700 mb-6">
              We&apos;d love to hear from you. Please fill out the form or reach
              out to us using the contact information below.
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">Address</h3>
                <address className="not-italic text-gray-700">
                  123 Tech Street
                  <br />
                  Innovation City, ST 12345
                  <br />
                  United States
                </address>
              </div>

              <div>
                <h3 className="font-medium text-gray-900">Email</h3>
                <p className="text-gray-700">
                  <a
                    href="mailto:support@electro.com"
                    className="text-green-800 hover:underline">
                    support@electro.com
                  </a>
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900">Phone</h3>
                <p className="text-gray-700">
                  <a
                    href="tel:+11234567890"
                    className="text-green-800 hover:underline">
                    +1 (123) 456-7890
                  </a>
                </p>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
            <h2 className="text-xl font-medium mb-4 text-gray-900">
              Business Hours
            </h2>
            <div className="space-y-2 text-gray-700">
              <p>
                <span className="font-medium">Monday - Friday:</span> 9:00 AM -
                6:00 PM EST
              </p>
              <p>
                <span className="font-medium">Saturday:</span> 10:00 AM - 4:00
                PM EST
              </p>
              <p>
                <span className="font-medium">Sunday:</span> Closed
              </p>
            </div>
          </section>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-6 border border-gray-200 h-fit rounded-lg shadow-sm">
          <h2 className="text-xl font-medium mb-6 text-gray-900">
            Send Us a Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"></textarea>
            </div>

            {status.message && (
              <div
                className={`p-3 rounded-md ${
                  status.type === "success"
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}>
                {status.message}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-800/80 hover:bg-green-800 text-white py-2 px-6 rounded-md transition duration-200 disabled:opacity-70 font-semibold">
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
