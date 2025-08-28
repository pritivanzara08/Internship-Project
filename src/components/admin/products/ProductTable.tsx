import React from "react";
import { Product } from "@/types/admin";
import categories from "@/data/catalog";
import { ProductRow } from "./ProductRow";

interface Props {
  products: Product[];
  onEdit: (p: Product) => void;
  onDelete: (id: string) => void;
}

export const ProductTable: React.FC<Props> = ({ products, onEdit, onDelete }) => {
  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Title</th>
          <th>Description</th>
          <th>Category</th>
          <th>Image</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((p) => {
          const category = categories.find((c) => c.id === p.categoryId);
          return (
            <ProductRow
              key={p.id}
              product={p}
              category={category?.label || p.categoryId}
              onEdit={() => onEdit(p)}
              onDelete={() => onDelete(p.id)}
            />
          );
        })}
      </tbody>
    </table>
  );
};
