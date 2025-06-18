type CartItemProps = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    onRemove: (id: number) => void;
  };
  
  export default function CartItem({ id, name, price, quantity, onRemove }: CartItemProps) {
    return (
      <li className="flex justify-between items-center border-b py-2">
        <span>
          {name} - ${price} x {quantity}
        </span>
        <button
          onClick={() => onRemove(id)}
          className="bg-red-500 text-white px-2 py-1 rounded"
        >
          Remove
        </button>
      </li>
    );
  }