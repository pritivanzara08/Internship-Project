import React, { useState } from "react";
import ProductList from "../components/product/ProductList";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-10">
        <h1 className="text-5xl font-extrabold mb-2 text-blue-700">Welcome to the E-commerce Storefront</h1>
        <p className="text-lg text-gray-500 mb-6">Find the best customized gifts and products here!</p>
        <div className="flex justify-center gap-4">
          <button className="bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600 transition">Shop Now</button>
          <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded shadow hover:bg-gray-300 transition">Learn More</button>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-center">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Replace with dynamic featured products */}
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-lg font-bold mb-2">Product 1</h3>
            <p className="text-gray-600 mb-2">200 ₹</p>
            <button className="bg-blue-500 text-white px-3 py-1 rounded">View</button>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-lg font-bold mb-2">Product 2</h3>
            <p className="text-gray-600 mb-2">500 ₹</p>
            <button className="bg-blue-500 text-white px-3 py-1 rounded">View</button>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-lg font-bold mb-2">Product 3</h3>
            <p className="text-gray-600 mb-2">350 ₹</p>
            <button className="bg-blue-500 text-white px-3 py-1 rounded">View</button>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="mb-10">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full md:w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full md:w-1/4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            <option value="leditems">LED Items</option>
            <option value="photoframes">Photo Frame</option>
            <option value="hampers">Hampers</option>
            <option value="giftcards">Gift Cards</option>
            <option value="customitems">Custom Items</option>
            <option value="kidsitems">Kids Items</option>
          </select>
        </div>
      </section>

      {/* Product List */}
      <main>
        <ProductList searchQuery={searchQuery} category={selectedCategory} />
      </main>
    </div>
  );
}