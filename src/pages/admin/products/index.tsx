// /pages/admin/products/index.tsx
import React from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
// import { ProductForm } from '../../../components/admin/ProductForm';
import { Product } from '@/types/admin';

const initialProducts: Product[] = [
  { id: 'p1', name: 'Nebula Lamp', price: 49.99, stock: 12, category: 'Lighting', imageUrl: '' },
  { id: 'p2', name: 'Aurora Mug', price: 14.0, stock: 30, category: 'Kitchen', imageUrl: '' },
];

const ProductsPage: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [products, setProducts] = React.useState<Product[]>(initialProducts);

  const onAdd = (p: Product) => {
    setProducts((prev) => [...prev, { ...p, id: `p${prev.length + 1}` }]);
  };

  return (
    <AdminLayout title="Products">
      <div style={styles.header}>
        <h2>Products</h2>
        <button onClick={() => setOpen(true)} style={styles.btn}>
          Add Product
        </button>
      </div>
      <table style={styles.table}>
        <thead>
          <tr><th>Name</th><th>Price</th><th>Stock</th><th>Category</th></tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>${p.price.toFixed(2)}</td>
              <td>{p.stock}</td>
              <td>{p.category}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* {open && (
        // <ProductForm
        //   onSubmit={(pd) => {
        //     onAdd(pd);
        //     setOpen(false);
        //   }}
        //   onClose={() => setOpen(false)}
        // />
      )} */}
    </AdminLayout>
  );
};

export default ProductsPage;

const styles: { [k: string]: React.CSSProperties } = {
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '16px 0' },
  btn: { padding: '8px 12px', borderRadius: 6, border: 'none', background: '#4f46e5', color: '#fff' },
  table: { width: '100%', borderCollapse: 'collapse' as const, background: '#fff' },
};