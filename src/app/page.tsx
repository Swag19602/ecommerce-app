import { Suspense } from "react";
import { Header } from "@/components/Header";
import { ProductList } from "@/components/ProductList";

export default function Home() {
  return (
    <main>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={<div>Loading...</div>}>
          <ProductList />
        </Suspense>
      </div>
    </main>
  );
}
