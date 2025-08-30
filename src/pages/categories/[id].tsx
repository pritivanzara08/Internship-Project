import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ProductCard from "@/components/shop/ProductCard";
import { Product } from "@/types/admin";
import productsData from "@/data/products";
import categories from "@/data/catalog";
import "@/styles/theme.css";

const ITEMS_PER_PAGE = 6;

export default function CategoryPage() {
  const router = useRouter();
  const { id } = router.query; // category id from URL

  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryInfo, setCategoryInfo] = useState<{
    label: string;
    coverImage: string;
  } | null>(null);

  useEffect(() => {
    if (!id) return;

    // Filter products by category
    const filtered = productsData.filter(
      (p) => p.categoryId === id
    );

    setCategoryProducts(filtered);
    setCurrentPage(1); // reset page when category changes

    // Get category label & cover image
    const categoryMeta = categories.find((cat) => cat.id === id);
    if (categoryMeta) {
      setCategoryInfo({
        label: categoryMeta.label,
        coverImage: categoryMeta.coverImage,
      });
    } else {
      setCategoryInfo(null);
    }
  }, [id]);

  // Pagination logic
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = categoryProducts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(categoryProducts.length / ITEMS_PER_PAGE);

  const handleAddToCart = (product: Product) => {
    console.log("Add to cart:", product);
    // Add your cart logic here
  };

  return (
    <div className="category-page">
      {/* Category Header */}
      {categoryInfo && (
        <div className="category-header">
          <img
            src={categoryInfo.coverImage}
            alt={categoryInfo.label}
            className="category-cover-image"
          />
          <h1 className="category-title">{categoryInfo.label}</h1>
        </div>
      )}

      {/* Products Grid */}
      <div className="product-grid">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
