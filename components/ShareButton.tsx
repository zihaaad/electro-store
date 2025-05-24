"use client";

import React from "react";
import {Share2} from "lucide-react";

interface ShareButtonProps {
  title: string;
  text: string;
}

const ShareButton = ({title, text}: ShareButtonProps) => {
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title,
          text,
          url: window.location.href,
        })
        .catch((err) => {
          console.error("Error sharing:", err);
        });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard
        ?.writeText(window.location.href)
        .then(() => {
          alert("Link copied to clipboard!");
        })
        .catch(() => {
          alert("Failed to copy link");
        });
    }
  };

  return (
    <div
      onClick={handleShare}
      className="flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect cursor-pointer">
      <Share2 className="text-lg" />
      <p>Share Product</p>
    </div>
  );
};

export default ShareButton;
