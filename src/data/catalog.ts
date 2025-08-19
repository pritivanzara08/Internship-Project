// src/data/catalog.ts
import products from './products';
import type { Product } from '../types';

export type ProductCategory = {
  id: string;
  label: string;
  products: Product[];
};

const categories: ProductCategory[] = [
  { id: 'photoframes', label: 'Photo Frames', products: [] },
  { id: 'hampers', label: 'Gift Hampers', products: [] },
  { id: 'birthdayitems', label: 'Birthday Items', products: [] },
  { id: 'anniversaryitems', label: 'Anniversary Items', products: [] },
  { id: 'festiveitems', label: 'Festive Items', products: [] },
  { id: 'leditems', label: 'LED Items', products: [] },
];

// populate
categories.forEach((cat) => {
  cat.products = (products.filter(p => p.categoryId === cat.id));
});

export default categories;