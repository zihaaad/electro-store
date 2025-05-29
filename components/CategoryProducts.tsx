"use client";
import {Category, Product} from "@/sanity.types";
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import {Button} from "./ui/button";
import {client} from "@/sanity/lib/client";
import {AnimatePresence, motion} from "motion/react";
import {ChevronDown, Filter, Loader2} from "lucide-react";
import NoProductAvailable from "./NoProductAvailable";
import ProductCard from "./ProductCard";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

interface Props {
  categories: Category[];
  slug: string;
}

const CategoryProducts = ({categories, slug}: Props) => {
  const [currentSlug, setCurrentSlug] = useState(slug);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const router = useRouter();

  const handleCategoryChange = (newSlug: string) => {
    if (newSlug === currentSlug) return; // Prevent unnecessary updates
    setCurrentSlug(newSlug);
    router.push(`/category/${newSlug}`, {scroll: false}); // Update URL without
  };

  const fetchProducts = async (categorySlug: string) => {
    setLoading(true);
    try {
      const query = `
        *[_type == 'product' && references(*[_type == "category" && slug.current == $categorySlug]._id)] | order(name asc){
        ...,"categories": categories[]->title}
      `;
      const data = await client.fetch(query, {categorySlug});
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts(currentSlug);
  }, [router, currentSlug]);

  return (
    <div className="w-full">
      {/* Desktop sidebar and products layout */}
      <div className="flex flex-col md:flex-row items-start gap-5">
        {/* Desktop Category Sidebar */}
        <div className="hidden md:flex md:flex-col md:min-w-40 border rounded-lg overflow-hidden">
          {categories?.map((item) => (
            <Button
              onClick={() =>
                handleCategoryChange(item?.slug?.current as string)
              }
              key={item?._id}
              className={`bg-transparent border-0 p-0 rounded-none text-darkColor shadow-none hover:bg-green-100 hover:text-green-800 font-semibold hoverEffect border-b last:border-b-0 transition-colors capitalize ${
                item?.slug?.current === currentSlug &&
                "bg-green-100 text-green-800 font-medium"
              }`}>
              <p className="w-full text-left px-2 py-3">{item?.title}</p>
            </Button>
          ))}
        </div>

        {/* Mobile Filter Button */}
        <div className="w-full md:hidden mb-4">
          <Sheet open={showMobileFilter} onOpenChange={setShowMobileFilter}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="w-full flex items-center justify-between border-gray-300">
                <div className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  <span>Filter by Category</span>
                </div>
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh]">
              <SheetHeader className="mb-4">
                <SheetTitle>Select Category</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-0">
                {categories?.map((item) => (
                  <Button
                    onClick={() => {
                      handleCategoryChange(item?.slug?.current as string);
                      setShowMobileFilter(false);
                    }}
                    key={item?._id}
                    variant="ghost"
                    className={`justify-start py-3 px-2 rounded-none border-b ${
                      item?.slug?.current === currentSlug
                        ? "bg-gray-100 text-shop_orange font-medium"
                        : "text-gray-700"
                    }`}>
                    {item?.title}
                  </Button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Products Display */}
        <div className="flex-1 w-full">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-gray-50 rounded-lg w-full">
              <div className="flex items-center space-x-2 text-blue-600">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Loading products...</span>
              </div>
            </div>
          ) : products?.length > 0 ? (
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
              {products?.map((product: Product) => (
                <AnimatePresence key={product._id}>
                  <motion.div
                    initial={{opacity: 0, y: 10}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.3}}>
                    <ProductCard product={product} />
                  </motion.div>
                </AnimatePresence>
              ))}
            </div>
          ) : (
            <NoProductAvailable
              selectedTab={currentSlug}
              className="mt-0 w-full"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;
