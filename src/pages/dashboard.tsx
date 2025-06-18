import React, { useState } from "react";
import ProductList from "@/components/Product/ProductList";
import Head from "next/head";

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
    <>
      <Head>
        <title>Gift Items Dashboard | Admin</title>
        <meta name="description" content="Manage products, view orders, and track user activity on the Gift Items Store dashboard." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="container mx-auto px-4">
        <header className="text-center py-8">
          <h1 className="text-4xl font-bold">Welcome to the E-commerce Storefront</h1>
          <p className="text-lg mt-2">Find the best products here!</p>
          <div className="mt-6">
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {/* Replace with dynamic featured products */}
              <div className="bg-white shadow-md rounded-lg p-4">
                <h3 className="text-lg font-bold">Product 1</h3>
                <p className="text-gray-600">200</p>
              </div>
              <div className="bg-white shadow-md rounded-lg p-4">
                <h3 className="text-lg font-bold">Product 2</h3>
                <p className="text-gray-600">500</p>
              </div>
            </div>
          </div>
        </header>
        <main>
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select 
              value={selectedCategory} 
              onChange={handleCategoryChange} 
              className="mt-2 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">All Categories</option>
                <option value="leditems">LED Items</option>
                <option value="photoframes">Photo Frame</option>
                <option value="hampers">Hampers</option>
                <option value="giftcards">Gift Cards</option>
                <option value="customitems">Custom Items</option>
                <option value="kidsitems">Kids Items</option>
            </select>
          </div>
          <ProductList searchQuery={searchQuery} 
          // category={selectedCategory} 
          />
        </main>
      </div>
    </>
    );
  }