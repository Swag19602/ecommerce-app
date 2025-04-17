"use client";

import { useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { Product } from "@/types/product";
import { addToCart } from "@/store/cartSlice";
import { SimilarProducts } from "./SimilarProducts";

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(product.thumbnail);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image gallery */}
          <div className="flex flex-col">
            <div className="relative h-96 w-full overflow-hidden rounded-lg">
              <Image
                src={selectedImage}
                alt={product.title}
                fill
                className="h-full w-full object-cover object-center"
                priority
              />
            </div>
            <div className="mt-4 grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  type="button"
                  title={`${product.title} - ${index + 1}`}
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className={`relative h-24 w-24 overflow-hidden rounded-lg ${
                    selectedImage === image ? "ring-2 ring-blue-500" : ""
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.title} - ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="h-full w-full object-cover object-center"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              {product.title}
            </h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl text-gray-900">${product.price}</p>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div className="text-base text-gray-700 space-y-6">
                <p>{product.description}</p>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <svg
                      key={rating}
                      className={`h-5 w-5 flex-shrink-0 ${
                        rating < Math.floor(product.rating)
                          ? "text-yellow-400"
                          : "text-gray-200"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 15.585l-6.327 3.324 1.209-7.037L.673 7.324l7.036-1.022L10 0l2.291 6.302 7.036 1.022-4.209 4.548 1.209 7.037z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
                <p className="ml-3 text-sm text-gray-500">
                  {product.rating} out of 5 stars
                </p>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center">
                <p className="text-sm text-gray-500">Brand: {product.brand}</p>
                <p className="ml-4 text-sm text-gray-500">
                  Category: {product.category}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center">
                <p className="text-sm text-gray-500">
                  Stock: {product.stock} units
                </p>
                <p className="ml-4 text-sm text-gray-500">
                  Discount: {product.discountPercentage}% off
                </p>
              </div>
            </div>

            <div className="mt-10 flex">
              <button
                onClick={handleAddToCart}
                className="w-full bg-blue-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        <SimilarProducts
          category={product.category}
          currentProductId={product.id}
        />
      </div>
    </div>
  );
}
