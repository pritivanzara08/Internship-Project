// /pages/admin/products/index.tsx
import React, { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Product } from "@/types/admin";
import productsData from "@/data/products";

import "@/styles/adminLayout.css"; // import CSS
import { ProductForm } from "@/components/admin/products/ProductForm";
import { ProductTable } from "@/components/admin/products/ProductTable";

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(productsData);
  const [editing, setEditing] = useState<Product | null>(null);

  const handleSave = (product: Product) => {
    setProducts((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.map((p) => (p.id === product.id ? product : p));
      }
      return [...prev, product];
    });
    setEditing(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <AdminLayout title="Products">
      <div className="admin-header">
        <h2 className="beautiful-title">Products</h2>
        <button className="btn-add" onClick={() => setEditing({} as Product)}>
          Add Product
        </button>
      </div>
      {editing ? (
        <ProductForm initialData={editing} onSave={handleSave} onCancel={() => setEditing(null)} />
      ) : (
        <ProductTable products={products} onEdit={setEditing} onDelete={handleDelete} />
      )}
    </AdminLayout>
  );
};

export default ProductsPage;
