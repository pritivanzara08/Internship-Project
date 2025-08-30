// src/components/shop/CategoryCard.tsx
import Link from "next/link";
import { ProductCategory } from "@/data/catalog";
import "@/styles/theme.css";

interface CategoryCardProps {
    category: ProductCategory;
    index: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, index }) => {
    return (
        <div className={`category-card fade-in-up`} style={{ animationDelay: `${index * 100}ms` }}>
            <Link href={`/category/${category.id}`}>
                <div className="category-card-inner">
                    <img src={category.coverImage} alt={category.label} className="category-card-image" />
                    <div className="category-card-content">
                        <h2 className="category-card-title">{category.label}</h2>
                        {/* <p className="category-card-desc">{category.description}</p> */}
                        <button className="view-all-btn">View All</button>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default CategoryCard;
