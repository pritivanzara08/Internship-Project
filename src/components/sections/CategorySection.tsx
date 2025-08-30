// src/components/shop/CategorySection.tsx
import Link from "next/link";
import { ProductCategory } from "@/data/catalog";
import "@/styles/theme.css"

interface CategorySectionProps {
  category: ProductCategory;
}

export default function CategorySection({ category }: CategorySectionProps) {
  return (
    <section className="category-section">
      <div className="category-header">
        <h2>{category.label}</h2>
        <Link href={`/category/${category.id}`} className="view-all-btn">
          View All →
        </Link>
      </div>
    </section>
  );
}
