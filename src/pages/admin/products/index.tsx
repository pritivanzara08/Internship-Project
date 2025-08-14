import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import Link from 'next/link';

type Product = {
_id: string;
name: string;
price: number;
inStock: boolean;
};

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('/api/products');
            const data = await response.json();
            setProducts(data);
        };
        fetchProducts();
    }, []);
    return (
        <AdminLayout>
            <h1>Products</h1>
            <Link href="/admin/products/new">Add Product</Link>
            <ul>
                {products.map((product) => (
                    <li key={product._id}>
                        <Link href={`/admin/products/${product._id}`}>
                            {product.name} - ${product.price}
                        </Link>
                    </li>
                ))}
            </ul>
        </AdminLayout>
    );
}