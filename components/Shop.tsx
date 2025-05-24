"use client";
import {Category, Product} from "@/sanity.types";
import React, {useEffect, useState} from "react";
import Container from "./Container";
import CategoryList from "./shop/CategoryList";
import {useSearchParams} from "next/navigation";
import PriceList from "./shop/PriceList";
import {client} from "@/sanity/lib/client";
import {Loader2, Filter} from "lucide-react";
import NoProductAvailable from "./NoProductAvailable";
import ProductCard from "./ProductCard";

interface Props {
  categories: Category[];
}
const Shop = ({categories}: Props) => {
  const searchParams = useSearchParams();
  const categoryParams = searchParams?.get("category");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categoryParams || null
  );
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let minPrice = 0;
      let maxPrice = 10000;
      if (selectedPrice) {
        const [min, max] = selectedPrice.split("-").map(Number);
        minPrice = min;
        maxPrice = max;
      }
      const query = `
      *[_type == 'product' 
        && (!defined($selectedCategory) || references(*[_type == "category" && slug.current == $selectedCategory]._id))
        && price >= $minPrice && price <= $maxPrice
      ] 
      | order(name asc) {
        ...,"categories": categories[]->title
      }
    `;
      const data = await client.fetch(
        query,
        {selectedCategory, minPrice, maxPrice},
        {next: {revalidate: 0}}
      );
      setProducts(data);
    } catch (error) {
      console.log("Shop product fetching Error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, selectedPrice]);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="border-t pt-3">
      <Container className="">
        <div className="md:hidden flex justify-between items-center mb-4 sticky top-0 bg-white z-10 p-2 border-b">
          <h2 className="text-lg font-medium">Products</h2>
          <button
            onClick={toggleFilters}
            className="flex items-center gap-2 bg-shop_dark_green text-white px-4 py-2 rounded-md">
            <Filter size={18} />
            <span>Filters</span>
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-5 border-t-shop_dark_green/50">
          <div
            className={`${
              showFilters ? "block" : "hidden"
            } md:block md:sticky  md:self-start md:h-[calc(100vh-160px)] md:overflow-y-auto md:min-w-64 pb-5 scrollbar-thin bg-white md:bg-transparent z-20 fixed top-[60px] left-0 right-0 h-[calc(100vh-60px)] overflow-y-auto p-4 md:p-0  md:top-0`}>
            <div className="flex justify-between items-center md:hidden mb-4">
              <h3 className="font-medium">Filter Options</h3>
              <button onClick={toggleFilters} className="text-gray-500">
                Close
              </button>
            </div>
            <CategoryList
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={(category) => {
                setSelectedCategory(category);
                if (window.innerWidth < 768) {
                  setShowFilters(false);
                }
              }}
            />
            <PriceList
              setSelectedPrice={(price) => {
                setSelectedPrice(price);
                if (window.innerWidth < 768) {
                  setShowFilters(false);
                }
              }}
              selectedPrice={selectedPrice}
            />
          </div>
          <div className="flex-1 pt-5 pb-5">
            <div className="overflow-y-auto pr-2 scrollbar-hide">
              {loading ? (
                <div className="p-20 flex flex-col gap-2 items-center justify-center bg-white">
                  <Loader2 className="w-10 h-10 text-shop_dark_green animate-spin" />
                  <p className="font-semibold tracking-wide text-base">
                    Product is loading . . .
                  </p>
                </div>
              ) : products?.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
                  {products?.map((product) => (
                    <ProductCard key={product?._id} product={product} />
                  ))}
                </div>
              ) : (
                <NoProductAvailable className="bg-white mt-0" />
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Shop;
