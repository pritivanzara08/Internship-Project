export type UserRole = "admin" | "customer";

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export type Product = {
  id: string;
  name: string;
  title: string;
  description: string;
  imageUrl: string;
  categoryId: string;
  price?: number;
  stock?: number;
  updatedAt?: string;
};

export interface Order {
  id: string;
  userId: string;
  customerName: string;
  total: number;
  items: OrderItem[];
  status: OrderStatus;
  createdAt: string;
}

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  joinedAt: string;
  totalSpend?: number;
};

export interface OrderItem {
  productId: string;
  name: string;
  qty: number;
  price: number;
}