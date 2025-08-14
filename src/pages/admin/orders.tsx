import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from 'next/router';


interface Order {
    id: string;
    items: any[];
    total: number;
    createdAt: any;
}

const UserOrdersPage: React.FC = () => {
    const { user, loading } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [fetching, setFetching] = useState(true);
    
    //Redirect if not logged in
    const router = useRouter();
    useEffect(() => {
      if (!loading && !user) {
        router.push("/login");
      }
    }, [user, loading]);

    useEffect(() => {
        const fetchOrders = async () => {
      if (!user) return;
      try {
        const res = await fetch(`/api/orders/user/${user.uid}`);
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

  if (loading || fetching) return <p>Loading...</p>;
  if (!orders.length) return <p>No orders found.</p>;

  return (
    <div>
      <h1>Your Orders</h1>
      {orders.map(order => (
        <div key={order.id} style={{ border: "1px solid #ccc", marginBottom: "1rem", padding: "1rem" }}>
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Total:</strong> ₹{order.total}</p>
          <p><strong>Items:</strong> {order.items.length}</p>
        </div>
      ))}
    </div>
  );
};

export default UserOrdersPage;
