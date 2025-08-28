import catalog from "@/data/catalog";
import React from "react";
import Link from "next/link";
import "@/styles/ProductStyles.css";

export default function CategoriesPage() {
  return (
    <section className="categories-section">
      <div className="categories-container">
        <h2 className="beautiful-title">Our Categories</h2>

        <div className="categories-grid">
          {catalog.map((category) => (
            <div key={category.id} className="category-card-container">
              <Link href={`/categories/${category.id}`} className="category-card">
                <div className="category-info">
                  <img className="category-image" src={category.products[0]?.imageUrl ?? "/placeholder.png"} alt={category.label} />
                </div>
              </Link>
              <h3 className="category-label">{category.label}</h3>

              {/* horizontal line */}
              {
                category.products.length > 0 && (
                  <div className="product-divider">
                    {category.products.slice(0, 5).map((product) => (
                      <img key={product.id} src={product.imageUrl} alt={product.name} className="divider-product-image" />
                    ))}
                  </div>
                )
              }
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}