import React, { useState } from "react";
import products from "@/data/products"; // your local product data
import ProductCard from "@/components/shop/ProductCard"; // assume you already have a card component

const ProductsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div className="products-page">
      <h1 className="text-center text-2xl font-bold my-6">All Products</h1>
      
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
        {/* {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))} */}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 rounded ${
              currentPage === index + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
