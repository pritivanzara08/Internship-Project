type CartItemProps = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string; // Optional, if you want to display an image
  onRemove: (id: string) => void;
};

export default function CartItem({
  id,
  name,
  price,
  quantity,
  imageUrl,
  onRemove,
}: CartItemProps) {
  return (
    <li className="cart-item">
      <div className="cart-item-info">
        {imageUrl && (
          <img src={imageUrl} alt={name} className="cart-item-image" />
        )}
        <div>
          <h4 className="cart-item-name">{name}</h4>
          <p className="cart-item-price">
            ₹{typeof price === 'number' ? price.toFixed(2) : '0.00'} × {quantity}
          </p>

        </div>
      </div>
      <button onClick={() => onRemove(id)} className="cart-remove-btn">
        Remove
      </button>
    </li>
  );
}
