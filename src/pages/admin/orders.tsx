import React, { use, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from 'next/router';
import { AdminLayout } from "@/components/layout/AdminLayout";
import { OrderTable } from "@/components/admin/orders/OrderTable";
import { Order } from "@/types/admin";
import { set } from "mongoose";

const AdminOrdersPage: React.FC = () => {
    const { user, loading } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [fetching, setFetching] = useState(true);
    const router = useRouter();

    //redirect if not admin
    useEffect(() => {
      if (!loading) {
        if(!user) {
          router.push("/login");
        }else if (user.role !== "admin") {
          router.push("/");
        }
      }
    }, [user, loading]);
  
    //fetch all orders
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
  
      if (!loading) {
        fetchOrders();
      }
    }, [user, loading]);

  //handle status update
  const handleStatusChange = async (id: string, status: string) => {
    // setOrders((prev) => 
    //   prev.map((order) => 
    //     order.id === id ? { ...order, status } : order
    //   )
    // );
    await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });
  };

  //handle order deletion
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this order?")) return;
    setOrders((prev) => prev.filter((order) => order.id !== id));
    await fetch(`/api/orders/${id}`, {
      method: "DELETE",
    });
  };

  if (loading || fetching) return <p>Loading...</p>;
  if (!orders.length) return <p>No orders found.</p>;

  return (
    <AdminLayout title="Orders">
      <h1 className="beautiful-title">All Orders</h1>
      {orders.length ? (
        <OrderTable 
          orders={orders} 
          onStatusChange={handleStatusChange} 
          onDelete={handleDelete} 
        />
      ) : (
        <p>No orders found.</p>
      )}
    </AdminLayout>
  );
};

export default AdminOrdersPage;
