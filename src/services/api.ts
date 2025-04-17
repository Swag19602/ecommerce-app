import { Category } from "@/types/category";
import { ProductsResponse, Product } from "@/types/product";

const BASE_URL = "https://dummyjson.com/products";

export async function getProducts(
  page: number = 1,
  limit: number = 12,
  category?: string,
  sortBy?: string
): Promise<ProductsResponse> {
  let url = `${BASE_URL}?limit=${limit}&skip=${(page - 1) * limit}`;

  if (category) {
    // Correctly append the category filter
    url = `${BASE_URL}/category/${category}?limit=${limit}&skip=${(page - 1) * limit}`;
  }


  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: ProductsResponse = await response.json();

  if (sortBy) {
    data.products.sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  }

  return data;
}

export async function getProduct(id: number): Promise<Product> {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }
  return response.json();
}

export async function searchProducts(query: string): Promise<ProductsResponse> {
  const response = await fetch(`${BASE_URL}/search?q=${query}`);
  if (!response.ok) {
    throw new Error("Failed to search products");
  }
  return response.json();
}

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${BASE_URL}/categories`);
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  return response.json();
}


export async function getProductsByCategory(
  category: string,
  page: number = 1,
  limit: number = 12
): Promise<ProductsResponse> {
  const url = `${BASE_URL}/category/${category}?limit=${limit}&skip=${(page - 1) * limit}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch category products");
  }
  return response.json();
}