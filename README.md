# E-commerce Application

A modern e-commerce application built with Next.js 14, Redux Toolkit, TypeScript, and Tailwind CSS.

## Features

- Product listing with server-side pagination
- Product filtering by category
- Product sorting by price and rating
- Product search with debouncing
- Product detail pages with image gallery
- Shopping cart functionality
- Responsive design
- TypeScript for type safety
- Redux Toolkit for state management
- Modern UI with Tailwind CSS

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Redux Toolkit
- Tailwind CSS
- DummyJSON API - https://dummyjson.com/products

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd ecommerce-app
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/                 # Next.js app router pages
├── components/          # React components
├── store/              # Redux store and slices
├── types/              # TypeScript type definitions
├── services/           # API services
├── utils/              # Utility functions
└── hooks/              # Custom React hooks
```

## Features Implementation

### Product Listing

- Server-side pagination with 12 products per page
- Category filtering
- Price and rating sorting
- Responsive grid layout

### Product Search

- Debounced search input
- Search suggestions
- Dedicated search results page

### Shopping Cart

- Add/remove items
- Quantity adjustment
- Cart total calculation
- Persistent cart data

### Product Details

- Image gallery
- Product information
- Add to cart functionality
- Related products

## Performance Optimizations

- Server-side rendering for initial page load
- Image optimization with Next.js Image component
- Debounced search to prevent API rate limiting
- Proper loading states and error handling
- Responsive images and layouts


## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.


## Vercel Link

[https://ecommerce-app-pied-seven.vercel.app/](https://ecommerce-app-pied-seven.vercel.app/)


