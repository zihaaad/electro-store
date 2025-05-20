"use client";

import useStore from "@/store";
import {useSearchParams, useRouter} from "next/navigation";
import {Suspense, useEffect, useState} from "react";
import {motion} from "motion/react";
import {Check, Clock, Home, Package, ShoppingBag, Truck} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import Container from "@/components/Container";

const SuccessPageContent = () => {
  const {resetCart} = useStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (orderNumber) {
      resetCart();
    }

    const timer = setTimeout(() => {
      setIsRedirecting(true);
      setTimeout(() => {
        router.push("/orders");
      }, 500);
    }, 10000);

    return () => clearTimeout(timer);
  }, [orderNumber, resetCart, router]);

  const steps = [
    {
      icon: <Check className="h-6 w-6" />,
      text: "Order Confirmed",
      completed: true,
    },
    {
      icon: <Package className="h-6 w-6" />,
      text: "Processing",
      completed: false,
    },
    {icon: <Truck className="h-6 w-6" />, text: "Shipping", completed: false},
    {icon: <Home className="h-6 w-6" />, text: "Delivered", completed: false},
  ];

  return (
    <Container className="py-16">
      <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: isRedirecting ? 0 : 1, y: isRedirecting ? -20 : 0}}
        transition={{duration: 0.5}}
        className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-shop_dark_green p-8 text-white text-center">
            <motion.div
              initial={{scale: 0}}
              animate={{scale: 1}}
              transition={{delay: 0.2, type: "spring", stiffness: 200}}
              className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="text-shop_dark_green w-10 h-10" />
            </motion.div>
            <h1 className="text-3xl font-bold mb-2">
              Thank You for Your Order!
            </h1>
            <p className="text-green-100">
              Your order has been received and is being processed.
            </p>
          </div>

          {/* Order details */}
          <div className="p-8">
            <div className="mb-8 text-center">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Order Details
              </h2>
              <p className="text-gray-500">Order Number:</p>
              <p className="text-lg font-bold text-shop_dark_green">
                {orderNumber}
              </p>
              <div className="flex items-center justify-center gap-2 mt-2 text-gray-500">
                <Clock className="h-4 w-4" />
                <p className="text-sm">
                  {new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>

            {/* Order progress */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Order Progress
              </h3>
              <div className="relative">
                {/* Progress line */}
                <div className="absolute left-[22px] top-0 bottom-0 w-1 bg-gray-200 z-0"></div>
                <div className="absolute left-[22px] top-0 w-1 bg-shop_light_green h-[25%] z-0"></div>

                {/* Steps */}
                <div className="space-y-8 relative z-10">
                  {steps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{opacity: 0, x: -20}}
                      animate={{opacity: 1, x: 0}}
                      transition={{delay: 0.3 + index * 0.1}}
                      className="flex items-start gap-4">
                      <div
                        className={`rounded-full h-11 w-11 flex items-center justify-center ${
                          step.completed
                            ? "bg-shop_light_green text-white"
                            : "bg-white border-2 border-gray-200 text-gray-400"
                        }`}>
                        {step.icon}
                      </div>
                      <div>
                        <p
                          className={`font-medium ${step.completed ? "text-shop_dark_green" : "text-gray-500"}`}>
                          {step.text}
                        </p>
                        {index === 0 && (
                          <p className="text-sm text-gray-500">
                            Your order has been confirmed and will be processed
                            soon.
                          </p>
                        )}
                        {index === 1 && (
                          <p className="text-sm text-gray-500">
                            We arre preparing your order for shipping.
                          </p>
                        )}
                        {index === 2 && (
                          <p className="text-sm text-gray-500">
                            Your order will be on its way soon.
                          </p>
                        )}
                        {index === 3 && (
                          <p className="text-sm text-gray-500">
                            Estimated delivery in 3-5 business days.
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <Button
                asChild
                variant="outline"
                className="border-shop_dark_green text-shop_dark_green hover:bg-shop_dark_green hover:text-white transition-all">
                <Link href="/orders">
                  <Package className="w-5 h-5 mr-2" />
                  View Order Details
                </Link>
              </Button>
              <Button
                asChild
                className="bg-shop_dark_green hover:bg-shop_btn_dark_green text-white transition-all">
                <Link href="/">
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Continue Shopping
                </Link>
              </Button>
            </div>

            <div className="text-center mt-8 text-sm text-gray-500">
              <p>
                You will be redirected to your orders page in a few seconds...
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </Container>
  );
};

const SuccessPage = () => {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-shop_dark_green"></div>
        </div>
      }>
      <SuccessPageContent />
    </Suspense>
  );
};

export default SuccessPage;
