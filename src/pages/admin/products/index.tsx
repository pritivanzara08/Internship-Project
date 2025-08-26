// /pages/admin/products/index.tsx
import React from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Product } from "@/types/admin";
import productsData from "@/data/products";
import categories from "@/data/catalog";
import "@/styles/adminLayout.css"; // import CSS

const ProductsPage: React.FC = () => {
  const [products, setProducts] = React.useState<Product[]>(productsData);

  return (
    <AdminLayout title="Products">
      <div className="admin-header">
        <h2>Products</h2>
        <button
          className="btn-add"
          onClick={() => alert("TODO: Add Product Form")}
        >
          Add Product
        </button>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => {
            const category = categories.find((c) => c.id === p.categoryId);
            return (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.title}</td>
                <td>{p.description}</td>
                <td>{category?.label || p.categoryId}</td>
                <td>
                  {p.imageUrl ? (
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      className="product-image"
                    />
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </AdminLayout>
  );
};

export default ProductsPage;
