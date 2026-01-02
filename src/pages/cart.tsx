import { useState, useEffect } from "react";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import { useRouter } from "next/router";
import '@/styles/cart.css';

type CartItemType = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
};

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const router = useRouter();

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const parsed = JSON.parse(savedCart);
      console.log("Loaded Cart Items:", parsed);
      setCartItems(parsed);
    }
  }, []);

  // Save to localStorage when cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: CartItemType) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
    
  const handleCheckout = () => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login?redirect=/checkout");
    } else {
      router.push("/checkout");
    }
  };

  return (
    <div className="cart-container">
      <h2 className="cart-beautiful-title">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="cart-empty">Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                imageUrl={item.imageUrl}
                onRemove={removeFromCart}
              />
            ))}
          </ul>
          <CartSummary cartItems={cartItems} />
          <div className="text-right mt-4">
            <button
              onClick={handleCheckout}
              className="cart-checkout-btn"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
