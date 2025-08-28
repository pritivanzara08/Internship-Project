// src/components/layout/AdminLayout.tsx
import React from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import "@/styles/adminLayout.css";

export const AdminLayout: React.FC<{ title?: string; children: React.ReactNode }> = ({ title, children }) => {
  return (
    <div className="admin-layout">
      <AdminHeader title={title} />
      <div className="admin-layout__body">
        <AdminSidebar />
        <main className="admin-layout__content">{children}</main>
      </div>
    </div>
  );
};
