import Shop from "@/components/Shop";
import {getAllBrands, getCategories} from "@/sanity/queries";
import React from "react";

const ShopPage = async () => {
  const categories = await getCategories();
  const brands = await getAllBrands();
  console.log({categories}, {brands});
  return (
    <div className="bg-white">
      <Shop categories={categories} brands={brands} />
    </div>
  );
};

export default ShopPage;
