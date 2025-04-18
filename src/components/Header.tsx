/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import { searchProducts } from "@/services/api";
import { clsx } from "clsx";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

function highlightMatch(text: string, query: string) {
  const parts = text.split(new RegExp(`(${query})`, "gi"));
  return parts.map((part, i) => (
    <span
      key={i}
      className={
        part.toLowerCase() === query.toLowerCase()
          ? "font-semibold bg-yellow-100"
          : ""
      }
    >
      {part}
    </span>
  ));
}

export function Header() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const debouncedSearch = useDebounce(searchQuery, 300);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    if (debouncedSearch.length >= 2) {
      handleSearch(debouncedSearch);
    } else {
      setSuggestions([]);
    }
  }, [debouncedSearch]);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const data = await searchProducts(query);
      setSuggestions(data.products.slice(0, 5));
    } catch (error) {
      console.error("Search failed:", error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSuggestions([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setActiveIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      setActiveIndex(
        (prev) => (prev - 1 + suggestions.length) % suggestions.length
      );
    } else if (e.key === "Enter" && suggestions[activeIndex]) {
      router.push(`/product/${suggestions[activeIndex].id}`);
      setSuggestions([]);
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-gray-900">E-commerce</span>
          </Link>

          <form
            onSubmit={handleSubmit}
            className="flex-1 max-w-lg mx-8 relative"
          >
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search products..."
                className={clsx(
                  "w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
                  isLoading && "bg-gray-100"
                )}
              />
              {isLoading && (
                <div className="absolute right-3 top-2.5">
                  <div className="animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent"></div>
                </div>
              )}
            </div>

            {suggestions.length > 0 && (
              <div className="absolute mt-1 w-full bg-white rounded-lg shadow-lg z-50">
                {suggestions.map((product, index) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    className={clsx(
                      "block px-4 py-2 hover:bg-gray-100",
                      index === activeIndex && "bg-blue-100"
                    )}
                    onClick={() => setSuggestions([])}
                  >
                    <div className="flex items-center">
                      <Image
                        src={product.thumbnail}
                        alt={product.title}
                        width={40}
                        height={40}
                        className="rounded-md"
                      />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {highlightMatch(product.title, debouncedSearch)}
                        </p>
                        <p className="text-sm text-gray-500">
                          ${product.price}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {!isLoading && debouncedSearch && suggestions.length === 0 && (
              <div className="absolute mt-1 w-full bg-white rounded-lg shadow-lg px-4 py-2 text-gray-500 z-50">
                No products found.
              </div>
            )}
          </form>
          <div className="flex items-center space-x-6">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 text-sm font-medium transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              href="/cart"
              className="relative flex items-center text-gray-700 hover:text-gray-900 transition-colors duration-200"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-sm transform scale-100 hover:scale-110 transition-transform duration-200">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
