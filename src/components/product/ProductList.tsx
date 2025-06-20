import { useEffect, useState } from "react";
import { Product } from "../../types";
import ProductCard from "./ProductCard";

/* Removed local Product type to avoid conflict with imported Product type */

type ProductListProps = {
  searchQuery: string;
  category: string;
};

const MOCK_PRODUCTS: Product[] = [
  { id: "1", name: "LED Photo Frame", title: "LED Photo Frame", description: "A beautiful LED photo frame.", price: 300, imageUrl: "./images/photo-frame.jpg", categoryId: "photoframes" },
  { id: "2", name: "Gift Hamper", title: "Gift Hamper", description: "A delightful gift hamper.", price: 500, imageUrl: "./images/hamper.jpg", categoryId: "hampers" },
  // ...add more products as needed
];

const ProductList = ({ searchQuery, category }: ProductListProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
//   const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setProducts(MOCK_PRODUCTS);
      setLoading(false);
    }, 500); // Simulating a network delay
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = 
     (product.name || product.title || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      !category || product.categoryId === category;
    return matchesSearch && matchesCategory;
});

    if (loading) return <div>Loading products...</div>;
    if (error) return <div>{error}</div>;

  return (
   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {filteredProducts.length === 0 ? (
        <div>No products found.</div>
      ) : (
        filteredProducts.map((product) => (
          <ProductCard image={""} key={product.id} {...product} />
        ))
      )}
    </div>
  );
};

export default ProductList;