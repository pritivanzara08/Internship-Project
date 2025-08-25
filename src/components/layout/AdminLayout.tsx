// /components/admin/AdminLayout.tsx
import React from 'react';
import { AdminSidebar } from '../admin/AdminSidebar';
import { AdminHeader } from '../admin/AdminHeader';
import "@/styles/adminLayout.css";

type Props = {
  children: React.ReactNode;
  title?: string;
};

export const AdminLayout: React.FC<Props> = ({ children, title }) => {
  return (
      <div className="admin-layout">
        <AdminSidebar />
        <div className="admin-layout__main">
          <AdminHeader title={title} />
          <main className="admin-layout__content">{children}</main>
      </div>
    </div>
  );
};
