import { Suspense } from "react";
import { Header } from "@/components/Header";
import { ProductDetail } from "@/components/ProductDetail";
import { getProduct } from "@/services/api";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const id = Number(params.id);
  const product = await getProduct(id).catch(() => null);

  if (!product) return notFound();

  return (
    <main>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={<div>Loading...</div>}>
          <ProductDetail product={product} />
        </Suspense>
      </div>
    </main>
  );
}
