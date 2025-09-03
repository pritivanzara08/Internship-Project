// src/pages/search.tsx
import { useRouter } from "next/router";
import { useState, useMemo } from "react";
import products from "@/data/products";
import ProductCard from "@/components/shop/ProductCard";
import "@/components/layout/Header.css"

export default function SearchPage() {
    const router = useRouter();
    const { query } = router.query;
    const searchQuery = (query as string) || "";

    const [sortOrder, setSortOrder] = useState("relevance");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const filteredProducts = useMemo(() => {
        let result = products.filter((p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        // ✅ Sorting
        if (sortOrder === "priceLow") {
            result = result.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
        } else if (sortOrder === "priceHigh") {
            result = result.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
        }
        return result;
    }, [searchQuery, sortOrder]);

    // ✅ Pagination
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="search-page">
            <h1>
                Search results for: <span className="query-text">"{searchQuery}"</span>
            </h1>

            {/* Sorting Dropdown */}
            <div className="search-controls">
                <label>Sort by: </label>
                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="relevance">Relevance</option>
                    <option value="priceLow">Price: Low → High</option>
                    <option value="priceHigh">Price: High → Low</option>
                </select>
            </div>

            {/* Results */}
            <div className="product-grid">
                {paginatedProducts.length > 0 ? (
                    paginatedProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={() => { }}
                        />
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="pagination">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((p) => p - 1)}
                    >
                        ← Previous
                    </button>
                    <span>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((p) => p + 1)}
                    >
                        Next →
                    </button>
                </div>
            )}
        </div>
    );
}
