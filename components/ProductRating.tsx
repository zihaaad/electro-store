import React from "react";
import {StarIcon} from "lucide-react";

interface ProductRatingProps {
  rating?: number;
  count?: number;
  size?: number;
  showCount?: boolean;
  className?: string;
}

const ProductRating = ({
  rating = 0,
  count = 0,
  size = 12,
  showCount = true,
  className = "",
}: ProductRatingProps) => {
  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      {[...Array(5)].map((_, index) => (
        <StarIcon
          key={index}
          size={size}
          className="text-shop_light_green"
          fill={index < Math.round(rating) ? "#3b9c3c" : "transparent"}
        />
      ))}
      {showCount && count > 0 && (
        <span className="text-xs font-semibold ml-1">{`(${count})`}</span>
      )}
    </div>
  );
};

export default ProductRating;
