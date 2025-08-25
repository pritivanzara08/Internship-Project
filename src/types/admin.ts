// /types/admin.ts
export type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  category?: string;
  imageUrl?: string;
  updatedAt?: string;
};

export type Order = {
  id: string;
  customerName: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  joinedAt: string;
  totalSpend?: number;
};