import React, { ReactNode } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import "@/styles/adminLayout.css";

interface Props {
  title?: string;
  children: ReactNode;
  userRole?: "admin" | "customer";
}

export const AdminLayout: React.FC<Props> = ({ title, children, userRole = "admin" }) => {
  return (
    <div className="admin-layout">
      <AdminSidebar userRole={userRole} />
      <div className="admin-main">
        <AdminHeader title={title} />
        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
};
