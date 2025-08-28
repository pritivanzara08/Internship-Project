import React from "react";
import { Product } from "@/types/admin";

export const ProductRow: React.FC<{
  product: Product;
  category: string;
  onEdit: () => void;
  onDelete: () => void;
}> = ({ product, category, onEdit, onDelete }) => {
  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.title}</td>
      <td>{product.description}</td>
      <td>{category}</td>
      <td>
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} className="product-image" />
        ) : (
          "—"
        )}
      </td>
      <td>
        <button className="btn-edit" onClick={onEdit}>Edit</button>
        <button className="btn-delete" onClick={onDelete}>Delete</button>
      </td>
    </tr>
  );
};
