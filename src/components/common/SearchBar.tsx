// src/components/search/SearchBar.tsx
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import products from "@/data/products";
import categories from "@/data/catalog";
import "@/components/layout/Header.css"

interface SearchBarProps {
    placeholder?: string;
}

export default function SearchBar({ placeholder = "Search products or categories..." }: SearchBarProps) {
    const [search, setSearch] = useState("");
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [highlightIndex, setHighlightIndex] = useState<number>(-1);
    const router = useRouter();
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Close dropdown if clicked outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
                setHighlightIndex(-1);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (search.trim()) {
            router.push(`/search?query=${encodeURIComponent(search)}`);
            setShowDropdown(false);
            setHighlightIndex(-1);
        }
    };

    const handleInputChange = (value: string) => {
        setSearch(value);

        if (value.trim() === "") {
            setSuggestions([]);
            setShowDropdown(false);
            return;
        }

        const lowerValue = value.toLowerCase();

        // 🔎 Match categories + products
        const matchedCategories = categories
            .filter((c) => c.label.toLowerCase().includes(lowerValue))
            .map((c) => ({ type: "category", id: c.id, label: c.label }));

        const matchedProducts = products
            .filter((p) => p.name.toLowerCase().includes(lowerValue))
            .map((p) => ({ type: "product", id: p.id, label: p.name, categoryId: p.categoryId }));

        const combined = [...matchedCategories, ...matchedProducts].slice(0, 8); // limit 8 suggestions
        setSuggestions(combined);
        setShowDropdown(true);
        setHighlightIndex(-1);
    };

    const handleSuggestionClick = (item: any) => {
        setShowDropdown(false);
        setHighlightIndex(-1);
        if (item.type === "category") {
            router.push(`/category/${item.id}`);
        } else {
            router.push(`/product/${item.id}`);
        }
    };

    // 👇 Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!showDropdown || suggestions.length === 0) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlightIndex((prev) => (prev + 1) % suggestions.length);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlightIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
        } else if (e.key === "Enter" && highlightIndex >= 0) {
            e.preventDefault();
            handleSuggestionClick(suggestions[highlightIndex]);
        }
    };

    return (
        <div className="search-bar-wrapper" ref={wrapperRef}>
            <form onSubmit={handleSearch} className="header-search-form">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className="header-search-input"
                />
                <button type="submit" className="header-search-btn">🔍</button>
            </form>

            {/* Suggestions Dropdown */}
            {showDropdown && suggestions.length > 0 && (
                <ul className="search-suggestions">
                    {suggestions.map((item, index) => (
                        <li
                            key={index}
                            className={`suggestion-item ${index === highlightIndex ? "highlighted" : ""}`}
                            onClick={() => handleSuggestionClick(item)}
                        >
                            <span className={`suggestion-type ${item.type}`}>
                                {item.type === "category" ? "📂" : "🎁"}
                            </span>
                            {item.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
