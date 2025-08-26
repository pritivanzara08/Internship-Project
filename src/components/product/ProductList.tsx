import { useState, useEffect, useRef } from "react";
import products from "@/data/products";
import Link from "next/link";
import "@/styles/ProductStyles.css";
import { Product } from "@/types/admin";
import Swal from "sweetalert2";
import { FaShoppingCart } from "react-icons/fa";

export default function ProductList() {
  const [randomProducts, setRandomProducts] = useState<typeof products>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    setRandomProducts(shuffled.slice(0, 5)); // Show 5 products
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth, scrollLeft } = scrollRef.current;
      const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
      scrollRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

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
    Swal.fire(`${product.name} added to cart!`);
    window.location.href = "/cart"; // Redirect to cart page
  };


  return (
    <div className="product-list">
      <h1 className="beautiful-title">Featured Products</h1>

      {/* Scroll Buttons */}
      <button className="scroll-btn scroll-left" onClick={() => scroll("left")}>
        &lt;
      </button>
      <button className="scroll-btn scroll-right" onClick={() => scroll("right")}>
        &gt;
      </button>

      <div className="product-scroll-container" ref={scrollRef}>
        {randomProducts.map((p) => (
          <div className="product-card">
            <img src={p.imageUrl} alt={p.name} />
            <div className="product-card-title">{p.name}</div>
            <div className="product-card-price">₹{p.price}</div>
            <div className="product-actions">
              <button className="add-to-cart-btn" onClick={() => addToCart(p)}>
                <FaShoppingCart /> Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
