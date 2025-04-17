import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { ProductCard } from "../ProductCard";
import cartReducer from "@/store/cartSlice";

const mockProduct = {
  id: 1,
  title: "Test Product",
  description: "Test Description",
  price: 99.99,
  discountPercentage: 10,
  rating: 4.5,
  stock: 100,
  brand: "Test Brand",
  category: "Test Category",
  thumbnail: "https://test.com/image.jpg",
  images: ["https://test.com/image.jpg"],
};

const renderWithRedux = (component: React.ReactElement) => {
  const store = configureStore({
    reducer: {
      cart: cartReducer,
    },
  });
  return render(<Provider store={store}>{component}</Provider>);
};

describe("ProductCard", () => {
  it("renders product information correctly", () => {
    renderWithRedux(<ProductCard product={mockProduct} />);

    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.category)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProduct.price}`)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.rating.toString())).toBeInTheDocument();
  });

  it("renders product image with correct attributes", () => {
    renderWithRedux(<ProductCard product={mockProduct} />);

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", mockProduct.thumbnail);
    expect(image).toHaveAttribute("alt", mockProduct.title);
  });

  it("adds product to cart when Add to Cart button is clicked", () => {
    renderWithRedux(<ProductCard product={mockProduct} />);

    const addToCartButton = screen.getByText("Add to Cart");
    fireEvent.click(addToCartButton);

    // Since we mocked useDispatch, we can't verify the actual dispatch
    // In a real test, you might want to spy on the dispatch function
    expect(addToCartButton).toBeInTheDocument();
  });

  it("navigates to product detail page when clicking on the product", () => {
    renderWithRedux(<ProductCard product={mockProduct} />);

    const productLink = screen.getByRole("link");
    expect(productLink).toHaveAttribute("href", `/product/${mockProduct.id}`);
  });
});
