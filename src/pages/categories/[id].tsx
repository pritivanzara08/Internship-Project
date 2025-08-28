import { useRouter } from "next/router";
import ProductList from "@/components/product/ProductList";
import catalog from "@/data/catalog";

export default function CategoryDetail() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) return null;

  // Find the category by ID
  const category = catalog.find((cat) => cat.id === id);
  if (!category)
    return <div className="">Category not found</div>;

  return (
    <div className="category-detail-container">
      <h2 className="category-label">{category.label}</h2>
      <ProductList category={category.id} />
    </div>
  );
}
