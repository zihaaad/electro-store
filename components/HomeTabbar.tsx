"use client";
import {productType} from "@/constants/data";
import Link from "next/link";
interface Props {
  selectedTab: string;
  onTabSelect: (tab: string) => void;
}

const HomeTabbar = ({selectedTab, onTabSelect}: Props) => {
  return (
    <div className="flex items-center flex-wrap justify-between">
      <div className="flex items-center gap-2 text-sm font-semibold">
        <div className="flex items-center flex-wrap gap-2 md:gap-3">
          {productType?.map((item) => (
            <button
              onClick={() => onTabSelect(item?.title)}
              key={item?.title}
              className={`border border-shop_light_green/30 px-6 py-1.5 md:px-6 md:py-2 rounded-full hover:bg-shop_light_green hover:border-shop_light_green hover:text-white hoverEffect ${selectedTab === item?.title ? "bg-shop_light_green text-white border-shop_light_green" : "bg-shop_light_green/10"}`}>
              {item?.title}
            </button>
          ))}
        </div>
      </div>
      <Link
        href={"/shop"}
        className="border border-darkColor px-6 py-1 mt-8 md:mt-0 rounded-full hover:bg-shop_light_green hover:text-white hover:border-shop_light_green hoverEffect">
        View all Products
      </Link>
    </div>
  );
};

export default HomeTabbar;
