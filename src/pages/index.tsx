import React, { useState } from "react";
import ProductList from "../components/product/ProductList";
import '../styles/globals.css'; // Ensure this path is correct based on your project structure

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
    <div className="main-container">
      {/* Hero Section */}
      <section className="banner">
        <h1>Welcome to the E-commerce Storefront</h1>
        <p className="text-lg text-gray-500 mb-6">Find the best customized gifts and products here!</p>
        <div className="explore-buttons">
          <button className="shopnowbtn">Shop Now</button>
          <button className="learnmorebtn">Learn More</button>
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
      {/* Product List */}
      <main>
        <ProductList searchQuery={searchQuery} category={selectedCategory} />
      </main>
    </div>
  );
}