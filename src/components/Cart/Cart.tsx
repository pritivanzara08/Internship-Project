import { useState } from "react";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

type CartItemType = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

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

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Shopping Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            onRemove={removeFromCart}
          />
        ))}
      </ul>
      <CartSummary cartItems={cartItems} />
    </div>
  );
}