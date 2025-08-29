import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { OrderTable } from "@/components/admin/orders/OrderTable";
import { Order } from "@/types/admin";

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

const AdminOrdersPage: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [fetching, setFetching] = useState(true);
  const router = useRouter();

  // Redirect if not admin
  useEffect(() => {
      if (!user) {
        router.push("/login");
      } else if (user.role !== "admin") {
        router.push("/"); // or redirect to dashboard/orders page for customer
      }
  }, [user]);

  // Fetch all orders
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      try {
        const res = await fetch("/api/orders");
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setFetching(false);
      }
    };

    if (user) fetchOrders();
  }, [user]);

  // Handle status update
  const handleStatusChange = async (id: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status } : order
      )
    );

    await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  };

  // Handle order deletion
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this order?")) return;
    setOrders((prev) => prev.filter((order) => order.id !== id));
    await fetch(`/api/orders/${id}`, { method: "DELETE" });
  };

  if (authLoading || fetching) return <p>Loading...</p>;
  if (!user) return <p>No user found</p>;
  if (!orders.length) return <p>No orders found.</p>;

  return (
    <AdminLayout title="Orders" userRole={user.role === "user" ? "customer" : user.role}>
      <h1 className="beautiful-title">All Orders</h1>
      <OrderTable
        orders={orders}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
      />
    </AdminLayout>
  );
};

export default AdminOrdersPage;
