// src/pages/product/[id].tsx
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import products from "@/data/products";
import categories from "@/data/catalog";
import { Product } from "@/types/admin";
import "@/styles/ProductStyles.css";

export default function ProductDetailsPage() {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState<Product | null>(null);
  const [categoryLabel, setCategoryLabel] = useState("");

  useEffect(() => {
    if (!id) return;

    const foundProduct = products.find((p) => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);

      const category = categories.find((c) => c.id === foundProduct.categoryId);
      if (category) {
        setCategoryLabel(category.label);
      }
    }
  }, [id]);

  if (!product) {
    return <p className="loading">Loading product...</p>;
  }

  const handleAddToCart = () => {
    console.log("Added to cart:", product);
    // TODO: integrate with cart context or redux
  };

  return (
    <div className="product-details-page">
      <div className="product-details-container">
        <div className="product-image">
          <img src={product.imageUrl} alt={product.name} />
        </div>

        <div className="product-info">
          <h1>{product.name}</h1>
          <h2>{product.title}</h2>
          <p className="category-tag">Category: {categoryLabel}</p>
          <p className="product-description">{product.description}</p>

          <div className="product-actions">
            <button className="btn-primary" onClick={handleAddToCart}>
              🛒 Add to Cart
            </button>
            <button className="btn-secondary" onClick={() => router.push("/")}>
              ← Back to Shop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
