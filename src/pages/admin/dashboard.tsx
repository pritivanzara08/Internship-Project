import React, { useEffect, useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import "@/styles/adminLayout.css";

interface DashboardData {
  usersCount: number;
  newOrdersToday: number;
  revenueThisMonth: number;
}

export default function AdminDashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/admin/dashboard");
        if (res.status === 403) {
          router.push("/login");
          return;
        }
        const json = await res.json();
        setData(json.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchData();
  }, [router, user]);

  if (authLoading || loading) return <p>Loading...</p>;
  if (!user || !data) return <p>No data available</p>;

  return (
    <AdminLayout title="Admin Dashboard" userRole={user.role === "admin" ? "admin" : undefined}>
      <h1 className="beautiful-title">Dashboard</h1>
      <div className="admin-dashboard-grid">
        <div className="card">
          <h2>Users</h2>
          <p>{data.usersCount}</p>
        </div>
        <div className="card">
          <h2>New Orders Today</h2>
          <p>{data.newOrdersToday}</p>
        </div>
        <div className="card">
          <h2>Revenue This Month</h2>
          <p>${data.revenueThisMonth}</p>
        </div>
      </div>
    </AdminLayout>
  );
}