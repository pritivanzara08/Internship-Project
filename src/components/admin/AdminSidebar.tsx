// /components/admin/AdminSidebar.tsx
import Link from 'next/link';
import React from 'react';
import "@/styles/adminLayout.css";

type NavItem = { label: string; href: string };

const items: NavItem[] = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Products', href: '/admin/products' },
  { label: 'Orders', href: '/admin/orders' },
  { label: 'Customers', href: '/admin/customers' },
  { label: 'Settings', href: '/admin/settings' },
];

export const AdminSidebar: React.FC = () => {
  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar__brand">Shop Admin</div>
      <nav>
        {items.map((it) => (
          <Link key={it.href} href={it.href} legacyBehavior>
            <a className="admin-sidebar__link">{it.label}</a>
          </Link>
        ))}
      </nav>
    </aside>
  );
};
