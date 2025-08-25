import ProductCard from "@/components/shop/ProductCard";
import productsData from "@/data/products";
import { useEffect, useState } from "react";
import '../../styles/ProductStyles.css';
import { Product } from "../../types/admin";

/* Removed local Product type to avoid conflict with imported Product type */

type ProductListProps = {
  searchQuery: string;
  category: string;
};

const ProductList = ({ searchQuery, category }: ProductListProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setProducts(productsData);
      setLoading(false);
    }, 500); // Simulating a network delay
  }, []);

  const addToCart = (product: Product) => {
    const existing = localStorage.getItem("cart");
    const cart = existing ? JSON.parse(existing) : [];

    const existingItemIndex = cart.findIndex((item: Product) => item.id === product.id);

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity = (cart[existingItemIndex].quantity || 1) + 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
    window.location.href = "/cart"; // Redirect to cart page
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      (product.name || product.title || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      !category || product.categoryId === category;
    return matchesSearch && matchesCategory;
  });

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="categories-section">
      <div className="section-container">
        <h2 className="beautiful-title">Categories</h2>
        <div className="categories-grid">
          {filteredProducts.length === 0 ? (
            <div>No products found.</div>
          ) : (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} onAddToCart={addToCart} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductList;