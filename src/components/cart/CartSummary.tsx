type CartSummaryProps = {
  cartItems: { id: string; name: string; price: number; quantity: number }[];
};

export default function CartSummary({ cartItems }: CartSummaryProps) {
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-summary">
      Total: ₹{totalPrice.toFixed(2)}
    </div>
  );
}
