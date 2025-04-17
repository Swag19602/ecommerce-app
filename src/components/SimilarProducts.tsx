"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { getProducts } from "@/services/api";
import { ProductCard } from "./ProductCard";

interface SimilarProductsProps {
  category: string;
  currentProductId: number;
}

export function SimilarProducts({
  category,
  currentProductId,
}: SimilarProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      try {
        const data = await getProducts(1, 4, category);
        // Filter out the current product and limit to 4 similar products
        const similarProducts = data.products
          .filter((product) => product.id !== currentProductId)
          .slice(0, 4);
        setProducts(similarProducts);
      } catch (err) {
        setError("Failed to fetch similar products");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSimilarProducts();
  }, [category, currentProductId]);

  if (isLoading) {
    return (
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Similar Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-200 rounded-lg h-80"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error || products.length === 0) {
    return null;
  }

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Similar {category} Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
