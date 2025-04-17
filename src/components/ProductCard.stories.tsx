import type { Meta, StoryObj } from "@storybook/react";
import { ProductCard } from "./ProductCard";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/store/cartSlice";

const meta: Meta<typeof ProductCard> = {
  title: "Components/ProductCard",
  component: ProductCard,
  decorators: [
    (Story) => {
      const store = configureStore({
        reducer: {
          cart: cartReducer,
        },
      });
      return (
        <Provider store={store}>
          <div className="max-w-sm">
            <Story />
          </div>
        </Provider>
      );
    },
  ],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

const mockProduct = {
  id: 1,
  title: "iPhone 9",
  description: "An apple mobile which is nothing like apple",
  price: 549,
  discountPercentage: 12.96,
  rating: 4.69,
  stock: 94,
  brand: "Apple",
  category: "smartphones",
  thumbnail: "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
  images: [
    "https://cdn.dummyjson.com/product-images/1/1.jpg",
    "https://cdn.dummyjson.com/product-images/1/2.jpg",
    "https://cdn.dummyjson.com/product-images/1/3.jpg",
    "https://cdn.dummyjson.com/product-images/1/4.jpg",
  ],
};

export const Default: Story = {
  args: {
    product: mockProduct,
  },
};

export const OutOfStock: Story = {
  args: {
    product: {
      ...mockProduct,
      stock: 0,
    },
  },
};

export const HighDiscount: Story = {
  args: {
    product: {
      ...mockProduct,
      discountPercentage: 50,
    },
  },
};

export const LowRating: Story = {
  args: {
    product: {
      ...mockProduct,
      rating: 2.5,
    },
  },
};
