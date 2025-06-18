import React, { useState } from "react";
import ProductList from "@/components/Product/ProductList";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="container mx-auto px-4">
      <header className="text-center py-8">
        <h1 className="text-4xl font-bold">Welcome to the E-commerce Storefront</h1>
        <p className="text-lg mt-2">Find the best products here!</p>
      </header>
      <main>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <ProductList searchQuery={searchQuery} />
      </main>
    </div>
  );
}