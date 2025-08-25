import React from "react";
import {AdminLayout} from "@/components/layout/AdminLayout";
import type { NextPage } from "next";
import "@/styles/adminLayout.css";
import { DashboardWidgetPanel } from '@/components/admin/DashboardWidgets';
import Link from "next/dist/client/link";

const DashboardPage: NextPage = () => {
  // You can replace this static data with real API data later
  const widgets = [
    { title: "Sales", value: "$12,340" },
    { title: "Orders", value: "320" },
    { title: "Users", value: "1,240" },
  ];

  return (
     <AdminLayout title="Dashboard">
      <DashboardWidgetPanel
        widgets={[
          { title: 'Revenue', value: '$12,400', delta: '+8%' },
          { title: 'Orders', value: '320', delta: '+12%' },
          { title: 'Customers', value: '1,240', delta: '+5%' },
          { title: 'Top Product', value: 'Nebula Lamp', delta: '' },
        ]}
      />
      <section className="dashboard-lower-section">
        <div className="dashboard-card">
          <h3>Recent Orders</h3>
          <p>Placeholder for recent orders list</p>
          <Link href="/admin/orders" passHref>
            <a>View all orders</a>
          </Link>
        </div>
        <div className="dashboard-card">
          <h3>Inventory Highlights</h3>
          <p>Placeholder for inventory stats</p>
        </div>
      </section>
    </AdminLayout>
  );
};

export default DashboardPage;