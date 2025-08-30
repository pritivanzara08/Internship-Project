import { useState } from 'react';
import { NextPage } from 'next';
import ProductCard from '@/components/shop/ProductCard';
import products from '@/data/products'; // adjust path if needed
import { Product } from '@/types/admin';
import '@/styles/ProductStyles.css';
import Swal from 'sweetalert2';

const ProductsPage: NextPage = () => {
  // Pagination setup
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const totalPages = Math.ceil(products.length / productsPerPage);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts: Product[] = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  function addToCart(p: Product): void {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push(p);
    localStorage.setItem("cart", JSON.stringify(cart));
    Swal.fire(`${p.name} added to cart!`);
  }

  return (
    <div className="products-page">
      <h1 className="beautiful-title">All Products</h1>

      {/* Product Grid */}
      <div className="product-grid">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={(p) => addToCart(p)} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductsPage;
