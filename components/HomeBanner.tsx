"use client";

import React from "react";
import {Title} from "./ui/text";
import Link from "next/link";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Pagination, EffectFade} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import {motion} from "framer-motion";

const slides = [
  {
    title: "Premium Headphones",
    subtitle: "Up to 40% off on select models",
    link: "/shop/headphones",
    color: "border-gray-600",
    shapes: [
      {type: "circle", size: "w-24 h-24", position: "top-4 right-8", delay: 0},
      {
        type: "circle",
        size: "w-16 h-16",
        position: "bottom-12 right-24",
        delay: 0.2,
      },
      {
        type: "rect",
        size: "w-20 h-20",
        position: "top-20 right-32",
        delay: 0.4,
      },
    ],
  },
  {
    title: "Smart Speakers",
    subtitle: "Exclusive bundle deals",
    link: "/shop/speakers",
    color: "border-slate-800",
    shapes: [
      {type: "rect", size: "w-32 h-16", position: "top-8 right-16", delay: 0.1},
      {
        type: "circle",
        size: "w-20 h-20",
        position: "bottom-8 right-12",
        delay: 0.3,
      },
      {
        type: "rect",
        size: "w-12 h-12",
        position: "top-24 right-40",
        delay: 0.5,
      },
    ],
  },
  {
    title: "Wearable Tech",
    subtitle: "New fitness trackers",
    link: "/shop/wearables",
    color: "border-zinc-800",
    shapes: [
      {
        type: "circle",
        size: "w-28 h-28",
        position: "top-6 right-20",
        delay: 0.2,
      },
      {
        type: "rect",
        size: "w-16 h-24",
        position: "bottom-10 right-16",
        delay: 0.4,
      },
      {
        type: "circle",
        size: "w-14 h-14",
        position: "top-16 right-48",
        delay: 0.6,
      },
    ],
  },
];

export default function HomeBannerCarousel() {
  return (
    <div className="w-full py-6">
      <Swiper
        className="w-full"
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        loop
        autoplay={{delay: 6000, disableOnInteraction: false}}
        pagination={{clickable: true}}>
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border  py-12 px-6 md:px-10 relative overflow-hidden h-64 md:h-72">
              {/* Animated shapes */}
              <div className="absolute inset-0 z-0">
                {slide.shapes.map((shape, i) => (
                  <motion.div
                    key={i}
                    className={`absolute ${shape.position} ${shape.size} ${shape.type === "circle" ? "rounded-full" : "rounded-md"} border ${slide.color} opacity-20`}
                    initial={{scale: 0, opacity: 0}}
                    animate={{
                      scale: 1,
                      opacity: 0.2,
                      rotate: shape.type === "rect" ? 45 : 0,
                    }}
                    transition={{
                      duration: 0.8,
                      delay: shape.delay,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col h-full justify-center max-w-md">
                <motion.div
                  initial={{opacity: 0, y: 20}}
                  animate={{opacity: 1, y: 0}}
                  transition={{duration: 0.6}}>
                  <Title className="text-3xl md:text-4xl font-medium mb-3 text-gray-800">
                    {slide.title}
                  </Title>
                  <p className="text-base text-gray-600 mb-5">
                    {slide.subtitle}
                  </p>
                  <motion.div
                    initial={{opacity: 0, y: 10}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.6, delay: 0.3}}>
                    <Link
                      className="inline-block bg-gray-800 hover:bg-gray-700 text-white px-5 py-2 rounded-full text-sm font-medium transition"
                      href={slide.link}>
                      Shop Now
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
