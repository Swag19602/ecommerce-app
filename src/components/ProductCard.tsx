"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  return (
    <div className="group relative bg-white rounded-lg shadow-md overflow-hidden">
      <Link href={`/product/${product.id}`} className="block">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-t-lg bg-gray-200">
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={500}
            height={500}
            className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity duration-300"
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            quality={75}
          />
        </div>
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-900">
            <span aria-hidden="true" className="absolute inset-0" />
            {product.title}
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.category}</p>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">
              ${product.price}
            </p>
            <div className="flex items-center">
              <svg
                className="h-4 w-4 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 15.585l-6.327 3.324 1.209-7.037L.673 7.324l7.036-1.022L10 0l2.291 6.302 7.036 1.022-4.209 4.548 1.209 7.037z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="ml-1 text-sm text-gray-500">
                {product.rating}
              </span>
            </div>
          </div>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <button
          onClick={handleAddToCart}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
