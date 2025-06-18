import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

type Product = {
    id: number;
    name: string;
    price: string;
    image: string;
}

const ProductList = ({ searchQuery }: { searchQuery: string}) => {
  const [products, setProducts] = useState<Product[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
);

  return (
    <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
            ))}
        </div>
    </div>
  );
};

export default ProductList;