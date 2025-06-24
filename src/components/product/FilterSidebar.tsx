// components/product/FilterSidebar.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const categories = [
  { label: 'All', value: '' },
  { label: 'Photo Frames', value: 'photoframes' },
  { label: 'Gift Hampers', value: 'hampers' },
  { label: 'Customized Mug', value: 'birthdayitems' },
  { label: 'Hats / Caps', value: 'anniversaryitems' },
  { label: 'Keychains', value: 'festiveitems' },
  { label: 'Wallets', value: 'leditems' },
];

const FilterSidebar: React.FC = () => {
  const router = useRouter();
  const [localFilters, setLocalFilters] = useState({
    category: '',
    price: '',
    stock: '',
    sort: '',
  });

  useEffect(() => {
    const query = router.query;
    setLocalFilters({
      category: (query.category as string) || '',
      price: (query.price as string) || '',
      stock: (query.stock as string) || '',
      sort: (query.sort as string) || '',
    });
  }, [router.query]);

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(router.query as any);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push({ pathname: '/', query: Object.fromEntries(params.entries()) });
  };

  return (
    <aside className="p-4 border rounded w-full md:w-60">
      <h2 className="text-lg font-bold mb-4">Filters</h2>

      {/* Category */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Category</label>
        <select
          value={localFilters.category}
          onChange={(e) => updateFilter('category', e.target.value)}
          className="w-full border rounded p-2"
        >
          {categories.map(({ label, value }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      {/* Price */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Price Range</label>
        <select
          value={localFilters.price}
          onChange={(e) => updateFilter('price', e.target.value)}
          className="w-full border rounded p-2"
        >
          <option value="">All</option>
          <option value="under500">Under ₹500</option>
          <option value="500to1000">₹500 - ₹1000</option>
          <option value="above1000">Above ₹1000</option>
        </select>
      </div>

      {/* Availability */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Availability</label>
        <select
          value={localFilters.stock}
          onChange={(e) => updateFilter('stock', e.target.value)}
          className="w-full border rounded p-2"
        >
          <option value="">All</option>
          <option value="in">In Stock</option>
          <option value="out">Out of Stock</option>
        </select>
      </div>

      {/* Sort */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Sort By</label>
        <select
          value={localFilters.sort}
          onChange={(e) => updateFilter('sort', e.target.value)}
          className="w-full border rounded p-2"
        >
          <option value="">Default</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>
    </aside>
  );
};

export default FilterSidebar;
