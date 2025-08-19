import Link from 'next/link';
import categories from '@/data/catalog';

export default function CatalogIndex() {
  return (
    <div>
      <h1 className='beautiful-title'>Products</h1>
      <ul>
        {categories.map((c) => (
          <li key={c.id}>
            <Link href={`/catalog/${c.id}`}>
              {c.label}
            </Link>
            <span> ({c.products.length})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
