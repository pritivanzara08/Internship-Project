type CartSummaryProps = {
    cartItems: { id: number; name: string; price: number; quantity: number }[];
  };
  
  export default function CartSummary({ cartItems }: CartSummaryProps) {
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
    return (
      <div className="text-right mt-4">
        <h3 className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</h3>
      </div>
    );
  }