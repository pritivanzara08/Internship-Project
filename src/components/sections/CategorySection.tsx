import { useEffect, useRef, useState } from "react";
import ProductCard from "@/components/shop/ProductCard";
import productsData from "@/data/products";
import { Product } from "@/types/admin";
import "@/styles/ProductStyles.css";

type CategorySectionProps = {
  categoryId: string;
  title: string;
  searchQuery?: string;
};

const CategorySection: React.FC<CategorySectionProps> = ({ categoryId, title, searchQuery }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setTimeout(() => {
      let filtered = productsData.filter((p) => p.categoryId === categoryId);

      // Shuffle products randomly
      filtered = filtered.sort(() => Math.random() - 0.5);

      // Limit to 6 or 7
      filtered = filtered.slice(0, 7);

      setProducts(filtered);
      setLoading(false);
    }, 300);
  }, [categoryId]);

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
    window.location.href = "/cart";
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  if (loading) return <div>Loading {title}...</div>;

  return (
    <section className="categories-section">
      <div className="section-container">
        <h2 className="beautiful-title">{title}</h2>

        <div className="scroll-container-wrapper">
          <button className="scroll-btn left" onClick={scrollLeft}>{"<"}</button>

          <div className="scroll-container" ref={scrollRef}>
            {products.length === 0 ? (
              <div>No products found.</div>
            ) : (
              products.map((product) => (
                <ProductCard key={product.id} {...product} onAddToCart={addToCart} />
              ))
            )}
          </div>

          <button className="scroll-btn right" onClick={scrollRight}>{">"}</button>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
