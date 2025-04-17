"use client";

import { Header } from "@/components/Header";
import { Cart } from "@/components/Cart";

export default function CartPage() {
  return (
    <main>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Cart />
      </div>
    </main>
  );
}
