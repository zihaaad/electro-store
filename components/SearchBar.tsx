"use client";

import {Search} from "lucide-react";
import React, {useState, useRef, useEffect} from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";
import PriceView from "./PriceView";
import {clientWithToken} from "@/sanity/lib/client";
import {urlFor} from "@/sanity/lib/image";

interface ProductImage {
  asset: {
    url: string;
  };
}

interface Product {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  price: number;
  discount: number;
  images: ProductImage[];
}

const SearchBar = () => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [open]);

  const handleSearch = async () => {
    if (searchTerm.trim() === "") return;

    setIsLoading(true);
    try {
      const query = `
        *[_type == "product" && name match $searchTerm] {
          _id,
          name,
          slug,
          price,
          discount,
          images,
          stock
        }
      `;

      const results = await clientWithToken.fetch(query, {
        searchTerm: `*${searchTerm}*`,
      });

      setSearchResults(results);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center justify-center">
          <Search className="w-5 h-5 hover:text-shop_light_green hoverEffect" />
        </button>
      </DialogTrigger>
      <DialogContent className="w-[90%] max-w-3xl">
        <DialogHeader>
          <DialogTitle>Search Products</DialogTitle>
        </DialogHeader>

        <div className="relative mt-2">
          <Input
            ref={inputRef}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search products..."
            className="pr-10"
          />
          <Button
            onClick={handleSearch}
            className="absolute right-0 top-0 h-full px-3 bg-shop_btn_dark_green hover:bg-shop_light_green"
            disabled={isLoading}>
            <Search className="w-4 h-4" />
          </Button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto mt-4">
          {isLoading ? (
            <div className="text-center py-8">Searching...</div>
          ) : searchResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {searchResults.map((product) => (
                <Link
                  href={`/product/${product.slug.current}`}
                  key={product._id}
                  onClick={() => setOpen(false)}
                  className="flex flex-col border rounded-md overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative h-32 bg-gray-100">
                    {product.images && product.images[0] && (
                      <Image
                        src={urlFor(product.images[0]).url()}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-contain"
                      />
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium line-clamp-1">{product.name}</h3>
                    <PriceView
                      price={product.price}
                      discount={product.discount}
                    />
                  </div>
                </Link>
              ))}
            </div>
          ) : searchTerm.trim() !== "" && !isLoading ? (
            <div className="text-center py-8">No products found</div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchBar;
