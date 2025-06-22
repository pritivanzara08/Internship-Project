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
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="hero-title">Welcome to the E-commerce Storefront</h1>
        <p className="hero-subtitle">Find the best customized gifts and products here!</p>
        <div className="hero-buttons">
          <button className="shop-now-btn">Shop Now</button>
          <button className="learn-more-btn">Learn More</button>
        </div>
      </section>
      {/* Product List */}
      <main>
        <ProductList searchQuery={searchQuery} category={selectedCategory} />
      </main>
    </div>
  );
}